BEGIN TRY

BEGIN TRAN;

-- CreateTable
CREATE TABLE [dbo].[User] (
    [id] INT NOT NULL IDENTITY(1,1),
    [name] NVARCHAR(100) NOT NULL,
    [email] NVARCHAR(150) NOT NULL,
    [password] NVARCHAR(255) NOT NULL,
    [role] NVARCHAR(20) NOT NULL CONSTRAINT [User_role_df] DEFAULT 'TRAINEE',
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [User_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 NOT NULL,
    CONSTRAINT [User_pkey] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [User_email_key] UNIQUE NONCLUSTERED ([email])
);

-- CreateTable
CREATE TABLE [dbo].[Course] (
    [id] INT NOT NULL IDENTITY(1,1),
    [title] NVARCHAR(200) NOT NULL,
    [description] NVARCHAR(max) NOT NULL,
    [youtubeUrl] NVARCHAR(500) NOT NULL,
    [createdById] INT,
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [Course_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 NOT NULL,
    CONSTRAINT [Course_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- AddForeignKey
ALTER TABLE [dbo].[Course] ADD CONSTRAINT [Course_createdById_fkey] FOREIGN KEY ([createdById]) REFERENCES [dbo].[User]([id]) ON DELETE SET NULL ON UPDATE CASCADE;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
