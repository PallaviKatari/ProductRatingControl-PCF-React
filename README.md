# Product Rating PCF

A React-based Power Apps Component Framework (PCF) control that lets users select a product rating from one to five stars. The control displays the current rating, shows "Not rated" when the value is zero, and respects the disabled state supplied by the host.

## Project layout

- `ProductRatingControl\ControlManifest.Input.xml` - PCF control metadata and bound properties.
- `ProductRatingControl\index.ts` - PCF lifecycle, rating value handling, and output updates.
- `ProductRatingControl\RatingView.tsx` - React star-rating interface.
- `ProductRatingControl\HelloWorld.tsx` - starter component retained in the project.
- `package.json` - build, lint, and local test harness commands.
- `ReactRatingPCF.pcfproj` - MSBuild project configuration for PCF packaging.

## Requirements

- Node.js and npm.
- Power Platform Component Framework tooling provided by this project’s npm dependencies.
- For packaging with MSBuild, a compatible Visual Studio/MSBuild installation with the Power Apps PCF build targets.

## Set up

Run these commands from the project root (the directory containing `package.json`):

```powershell
cd C:\PCFReactDemos\ReactRatingPCF
npm ci
```

`npm ci` installs the exact dependency versions recorded in `package-lock.json`.

## Build and validate

```powershell
npm run build
npm run lint
```

The PCF build output is written under `out\controls`. Generated output and dependencies are excluded from source control.

## Run the local test harness

```powershell
npm start
```

To run the harness in watch mode while editing:

```powershell
npm run start:watch
```

Use the harness to exercise the control locally. The control can then be added to a Power Apps or model-driven app environment through the normal PCF solution packaging and import workflow.

## Available npm commands

| Command | Description |
| --- | --- |
| `npm run build` | Build the PCF control. |
| `npm run clean` | Remove generated build output. |
| `npm run rebuild` | Clean and rebuild the control. |
| `npm run lint` | Run the project linter. |
| `npm run lint:fix` | Apply automatic lint fixes where possible. |
| `npm start` | Start the local PCF test harness. |
| `npm run start:watch` | Start the test harness in watch mode. |
| `npm run refreshTypes` | Refresh generated TypeScript types from the control manifest. |

## Control properties and behavior

The manifest declares two bound properties:

- `ratingValue` is an optional whole-number value. The control rounds and clamps incoming values to the range 0–5, displays the selected stars, and returns changes through the PCF output.
- `sampleProperty` is a required single-line text property retained from the starter control manifest. It is not currently used by the rating interface.

Selecting a star updates `ratingValue`. A value of `0` (including an unset value) is displayed as "Not rated." The host's disabled state disables all star buttons.
