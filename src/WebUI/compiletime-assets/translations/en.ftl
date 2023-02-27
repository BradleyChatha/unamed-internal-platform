test = abc123

### General strings ###

general-loading = Loading...
general-error = Error

### Kratos Section Titles ###

kratos-settings-title-profile       = Profile
kratos-settings-title-password      = Password
kratos-settings-title-lookup_secret = Lookup Secret
kratos-settings-title-webauthn      = WebAuthn
kratos-settings-title-totp          = TOTP

### Kratos Error Messages ###

kratos-error-by-id = {$id ->
    *[unknown] {$default} (Note: Unhandled Error ID {$id})
    [4000002] {$property ->
        *[unknown] Property {$property} is missing
        [totp_code] Please enter a valid TOTP code from your authenticator application
        [password] Please enter a password
    }
    [4010004] {$default} (Note: This is likely a bug, please report it.)
}