using ArtInMotion.Application.Streams.Commands.EndStream;
using ArtInMotion.Application.Streams.Commands.PublishPoseFrame;
using ArtInMotion.Application.Streams.Commands.StartStream;
using ArtInMotion.Application.Streams.Queries.GetStream;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace ArtInMotion.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public sealed class StreamsController(ISender sender) : ControllerBase
{
    [HttpGet("{id:guid}")]
    [ProducesResponseType(typeof(StreamSessionDto), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> Get(Guid id, CancellationToken cancellationToken)
    {
        var result = await sender.Send(new GetStreamQuery(id), cancellationToken);
        return result is null ? NotFound() : Ok(result);
    }

    [HttpPost("start")]
    [ProducesResponseType(typeof(Guid), StatusCodes.Status201Created)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<IActionResult> Start([FromBody] StartStreamCommand command, CancellationToken cancellationToken)
    {
        var id = await sender.Send(command, cancellationToken);
        return CreatedAtAction(nameof(Get), new { id }, id);
    }

    [HttpPost("{id:guid}/end")]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> End(Guid id, CancellationToken cancellationToken)
    {
        await sender.Send(new EndStreamCommand(id), cancellationToken);
        return NoContent();
    }

    [HttpPost("{id:guid}/pose")]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<IActionResult> PublishPose(Guid id, [FromBody] PublishPoseFrameRequest request, CancellationToken cancellationToken)
    {
        await sender.Send(new PublishPoseFrameCommand(id, request.TimestampMs, request.Keypoints), cancellationToken);
        return NoContent();
    }
}

public sealed record PublishPoseFrameRequest(
    long TimestampMs,
    IReadOnlyList<ArtInMotion.Application.Streams.Commands.PublishPoseFrame.KeypointDto> Keypoints);
