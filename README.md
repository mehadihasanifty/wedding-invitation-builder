# Wedding Invitation Builder
Standalone wedding invitation platform with separate Next.js and Express applications.

| Application | Folder | URL |
| --- | --- | --- |
| Frontend | `F:\Projects\wedding-invitation-builder` | http://localhost:3000 |
| Backend | `F:\Projects\wedding-invitation-builder-sever` | http://localhost:5000 |

Requires Node.js 20 or newer and npm. Dependencies are already installed in both folders.

## Configure
The backend reads its existing `.env`: `MONGODB_URI` is required; `PORT` defaults to 5000; `CLIENT_ORIGIN` defaults to http://localhost:3000; `NODE_ENV` defaults to development.
The frontend reads `NEXT_PUBLIC_API_URL` from its `.env`, defaulting to http://localhost:5000. Never put server secrets in a `NEXT_PUBLIC_*` variable.

## Run
Open two PowerShell terminals:
```powershell
Set-Location 'F:\Projects\wedding-invitation-builder-sever'
npm run dev
```
```powershell
Set-Location 'F:\Projects\wedding-invitation-builder'
npm run dev
```
Open http://localhost:3000. The foundation page checks the API health endpoint.

## API
`GET http://localhost:5000/api/health` returns the common `{ success, message, data, meta }` envelope. Errors use `{ success: false, message, errors?, meta }`. No business features or authentication are included in Phase 01.
