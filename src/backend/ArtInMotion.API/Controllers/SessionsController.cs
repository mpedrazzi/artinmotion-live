using ArtInMotion.Application.Sessions.Commands.CreateSession;
using ArtInMotion.Application.Sessions.Commands.EndSession;
using ArtInMotion.Application.Sessions.Queries.GetSession;
using ArtInMotion.Application.Sessions.Queries.ListSessions;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace ArtInMotion.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public sealed class SessionsController(ISender sender) : ControllerBase
{
    [HttpGet]
    [ProducesResponseType(typeof(IReadOnlyList<SessionDto>), StatusCodes.Status200OK)]
    public async Task<IActionResult> List([FromQuery] Guid? performerId, CancellationToken cancellationToken)
    {
        var result = await sender.Send(new ListSessionsQuery(performerId), cancellationToken);
        return Ok(result);
    }

    [HttpGet("{id:guid}")]
    [ProducesResponseType(typeof(SessionDto), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> Get(Guid id, CancellationToken cancellationToken)
    {
        var result = await sender.Send(new GetSessionQuery(id), cancellationToken);
        return result is null ? NotFound() : Ok(result);
    }

    [HttpPost]
    [ProducesResponseType(typeof(Guid), StatusCodes.Status201Created)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<IActionResult> Create([FromBody] CreateSessionCommand command, CancellationToken cancellationToken)
    {
        var id = await sender.Send(command, cancellationToken);
        return CreatedAtAction(nameof(Get), new { id }, id);
    }

    [HttpPost("{id:guid}/end")]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> End(Guid id, CancellationToken cancellationToken)
    {
        await sender.Send(new EndSessionCommand(id), cancellationToken);
        return NoContent();
    }
}
