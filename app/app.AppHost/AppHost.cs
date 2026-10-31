var builder = DistributedApplication.CreateBuilder(args);

var server = builder.AddProject<Projects.app_Server>("server")
    .WithHttpHealthCheck("/health")
    .WithExternalHttpEndpoints();

var webfrontend = builder.AddViteApp("webfrontend", "../frontend")
    .WithReference(server)
    .WaitFor(server);
var web = builder.AddViteApp("web", "../web")
    .WithReference(server)
    .WaitFor(server);
server.PublishWithContainerFiles(web, "wwwroot");

builder.Build().Run();
