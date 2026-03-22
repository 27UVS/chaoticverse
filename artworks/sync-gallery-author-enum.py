#!/usr/bin/env python3
"""
Refresh artworks.schema.json -> $defs.galleryAuthorId.enum from about_us/people
(same roles as the artworks page: scripters, artists, partners, exparticipants).

Run from repo root or this directory after adding/removing people:
  python artworks/sync-gallery-author-enum.py
"""
from __future__ import annotations

import json
import pathlib

ROOT = pathlib.Path(__file__).resolve().parent.parent
PEOPLE = ROOT / "about_us" / "people"
SCHEMA = ROOT / "artworks" / "artworks.schema.json"
ROLES = ("scripters", "artists", "partners", "exparticipants")


def main() -> None:
    ids: list[str] = []
    for role in ROLES:
        data = json.loads((PEOPLE / f"{role}.json").read_text(encoding="utf-8"))
        for p in data["people"]:
            ids.append(p["id"])
    ids.sort()

    schema = json.loads(SCHEMA.read_text(encoding="utf-8"))
    schema["$defs"]["galleryAuthorId"]["enum"] = ids
    SCHEMA.write_text(json.dumps(schema, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print(f"Updated {SCHEMA.relative_to(ROOT)} with {len(ids)} author ids.")


if __name__ == "__main__":
    main()
