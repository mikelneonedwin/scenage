# 🎬 Scenage

_For people who just want their movies and shows neatly in place._

**Scenage** is a type-safe Node.js CLI that helps you automatically organize your movie and TV show downloads.
It moves and renames video and subtitle files into the right folders, pads filenames for sorting, identifies missing or unmatched episodes — and even cleans up leftover clutter.

---

## ✨ Features (Planned / TODOs)

### 🗂️ File Arrangement

- [x] Detect all video and subtitle files within the source directory (recursively).
- [x] Move video files to their corresponding destination:
- [x] Group files by **series** and **season** automatically.
  - e.g. `./Breaking Bad/S01/`

### 🧩 Filename Normalization

- [x] Detect episodes (e.g., `S1E1`, `S01E01`, `Ep2`, etc.).
- [x] Add zero padding for better sorting (e.g., `S1E1` → `S01E01`).
- [x] Support user-defined padding size (`--pad-size`).

### 🗃️ Subtitle Matching

- [x] Rename subtitles to match their corresponding video filenames.
  - Example: `episode1.mp4` → `episode1.srt`.

- [x] Handle multiple subtitle formats (`.srt`, `.ass`, `.sub`, `.vtt`).

### 🔍 Consistency Checking

- [x] Detect **missing episodes** (video files that don’t exist but should).
- [x] Detect **unmatched subtitles** (subtitles with no corresponding video).
- [x] Detect **videos without subtitles**.
- [ ] Generate a short report to display or save as JSON (display is available, JSON is still in progress)

### 🧹 Cleanup & Maintenance

- [ ] Detect and remove **empty folders** left after sorting.
- [ ] Identify and delete **duplicate files** (based on name or hash).
- [ ] Remove **broken or zero-byte** files.
- [ ] Automatically delete **temporary files** (`.nfo`, `.part`, `.tmp`, `.sample`, etc.).
- [ ] Dry-run mode (`--dry`) to preview cleanups without deleting.
- [ ] Generate a **cleanup summary report**.

---

## 💡 Planned CLI Commands

| Command           | Description                                                         |
| ----------------- | ------------------------------------------------------------------- |
| `scenage arrange` | Scan and move all video/subtitle files to their respective folders. |
| `scenage check`   | List missing or unmatched episodes/subtitles.                       |
| `scenage clean`   | Remove unnecessary files and folders (duplicates, samples, etc.).   |
| `scenage auto`    | Automatically perform all operations based on context.              |

---

## 🧰 Example Usage

```bash
# Arrange all files in downloads/ and pad filenames with 2 digits
scenage arrange -i ./Downloads -o ./Videos --pad-size 2

# Check for missing subtitles and episodes
scenage check ./BreakingBad/Season\ 01

# Clean up junk and empty folders (dry-run first)
scenage clean ./Downloads --dry

# Auto-detect type of directory (season/series/all) and organize accordingly
scenage auto .
```

---

## 📅 Roadmap

| Version  | Focus                                | Highlights                           |
| -------- | ------------------------------------ | ------------------------------------ |
| **v0.1** | CLI scaffolding, directory scanning  | `scenage detect` + command structure |
| **v0.2** | File movement and renaming           | `scenage arrange`                    |
| **v0.3** | Subtitle matching and missing report | `scenage check`                      |
| **v0.4** | Cleanup utilities                    | `scenage clean` command              |
| **v1.0** | Auto-scope detection and polish      | `scenage auto`, stable release       |
