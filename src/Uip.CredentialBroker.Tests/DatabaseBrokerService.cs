using FluentValidation.Results;

namespace Uip.CredentialBroker.Tests;

public class DatabaseBrokerServiceTests
{
    [Fact]
    public async void CreateCredentials_HappyPath()
    {
        // Arrange
        var dbBrokerMock = new Mock<IDatabaseBroker>();
        dbBrokerMock
            .Setup(m => m.CreateCredentialsAsync("plugin"))
            .ReturnsAsync(new DatabaseCredentials("host", 123, "username", "hunter2", "dbname"));
        var service = new DatabaseBrokerService(
            Mock.Of<ILogger<DatabaseBrokerService>>(),
            dbBrokerMock.Object,
            Mock.Of<IValidator<CreateCredentialsRequest>>()
        );

        // Act
        var result = await service.CreateCredentials(
            new CreateCredentialsRequest { PluginId = "plugin" },
            Mock.Of<ServerCallContext>()
        );

        // Assert
        result
            .Should()
            .Be(
                new CreateCredentialsResponse
                {
                    Host = "host",
                    Port = 123,
                    Username = "username",
                    Password = "hunter2",
                    Dbname = "dbname"
                }
            );
    }

    [Fact]
    public async void CreateCredentials_ShouldBeValidating()
    {
        // Arrange
        var validatorMock = new Mock<IValidator<CreateCredentialsRequest>>();
        validatorMock
            .Setup(
                m =>
                    m.ValidateAsync(
                        It.IsAny<CreateCredentialsRequest>(),
                        It.IsAny<CancellationToken>()
                    )
            )
            .ReturnsAsync(new ValidationResult(new[] { new ValidationFailure("field", "error") }));
        var service = new DatabaseBrokerService(
            Mock.Of<ILogger<DatabaseBrokerService>>(),
            Mock.Of<IDatabaseBroker>(),
            validatorMock.Object
        );

        // Assert
        await service
            .Invoking(
                async s =>
                    await s.CreateCredentials(
                        new CreateCredentialsRequest(),
                        Mock.Of<ServerCallContext>()
                    )
            )
            .Should()
            .ThrowAsync<Exception>();
    }
}
