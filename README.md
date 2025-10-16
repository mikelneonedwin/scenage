# 🎬 Scenage
*For people who just want their movies and shows neatly in place.*

**Scenage** is a type-safe Node.js CLI that helps you automatically organize your movie and TV show downloads.
It moves and renames video and subtitle files into the right folders, pads filenames for sorting, and identifies missing or unmatched episodes — so you can stop cleaning folders manually.

---

## ✨ Features (Planned / TODOs)

### 🗂️ File Arrangement
- [ ] Detect all video and subtitle files within the source directory (recursively).
- [ ] Move video files to their corresponding destination:
  - Default: `./movies/`
  - Or a user-defined path via `--dest`.
- [ ] Group files by **series** and **season** automatically.
  - e.g. `./Breaking Bad/Season 01/`

### 🧩 Filename Normalization
- [ ] Detect episodes (e.g., `S1E1`, `S01E01`, `Ep2`, etc.).
- [ ] Add zero padding for better sorting (e.g., `S1E1` → `S01E01`).
- [ ] Support user-defined padding size (`--pad-size`).

### 🗃️ Subtitle Matching
- [ ] Rename subtitles to match their corresponding video filenames.
  - Example: `episode1.mp4` → `episode1.srt`.
- [ ] Handle multiple subtitle formats (`.srt`, `.ass`, `.sub`, `.vtt`).

### 🔍 Consistency Checking
- [ ] Detect **missing episodes** (video files that don’t exist but should).
- [ ] Detect **unmatched subtitles** (subtitles with no corresponding video).
- [ ] Detect **videos without subtitles**.
- [ ] Generate a short report to display or save as JSON.

### ⚙️ Scope Levels
- [ ] **All:** Run across all subdirectories recursively.
- [ ] **Series:** Process all seasons within a series folder.
- [ ] **Season:** Process only the current season folder.
- [ ] **Auto:** Automatically detect whether the current directory is a season, series, or general folder.

---

## 💡 Planned CLI Commands

| Command | Description |
|----------|-------------|
| `scenage arrange` | Scan and move all video/subtitle files to their respective folders. |
| `scenage rename` | Pad filenames and rename subtitles to match videos. |
| `scenage check` | List missing or unmatched episodes/subtitles. |
| `scenage auto` | Automatically perform all operations based on context. |

---

## 🧰 Example Usage

```bash
# Arrange all files in downloads/
scenage arrange ./Downloads --dest ./Videos

# Pad filenames with 2 digits
scenage rename ./BreakingBad --pad-size 2

# Check for missing subtitles
scenage check ./BreakingBad/Season\ 01
````
---

## 📅 Roadmap

* [ ] v0.1 — CLI scaffolding, directory scanning
* [ ] v0.2 — File movement and renaming
* [ ] v0.3 — Subtitle matching and missing report
* [ ] v1.0 — Auto-scope detection and polish
