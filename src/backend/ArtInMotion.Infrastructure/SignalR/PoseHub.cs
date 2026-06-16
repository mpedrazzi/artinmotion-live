using Microsoft.AspNetCore.SignalR;

namespace ArtInMotion.Infrastructure.SignalR;

public sealed class PoseHub : Hub
{
    public async Task JoinStream(string streamSessionId)
        => await Groups.AddToGroupAsync(Context.ConnectionId, streamSessionId);

    public async Task LeaveStream(string streamSessionId)
        => await Groups.RemoveFromGroupAsync(Context.ConnectionId, streamSessionId);

    public override async Task OnDisconnectedAsync(Exception? exception)
    {
        await base.OnDisconnectedAsync(exception);
    }
}
