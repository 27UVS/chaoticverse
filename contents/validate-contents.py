#!/usr/bin/env python3
"""
Проверка согласованности длин parts_ru/parts_en и urls_ru/urls_en в contents_names.json.

Запуск из корня репозитория:
  python contents/validate-contents.py
"""
from __future__ import annotations

import json
import pathlib
import sys

ROOT = pathlib.Path(__file__).resolve().parent
JSON_PATH = ROOT / "contents_names.json"


def story_issues(entry: dict, path: str) -> list[str]:
    if not entry.get("name_ru") and not entry.get("name_en"):
        return []
    issues: list[str] = []
    for lang in ("ru", "en"):
        urls = entry.get(f"urls_{lang}") or []
        parts = entry.get(f"parts_{lang}") or []
        if not parts and not urls:
            continue
        if len(parts) != len(urls):
            issues.append(
                f"{path} [{lang}]: parts_{lang} len {len(parts)} != urls_{lang} len {len(urls)}"
            )
    return issues


def walk(data: dict, base: str = "") -> list[str]:
    out: list[str] = []
    for season, arcs in data.items():
        if season == "$schema":
            continue
        sp = f"{base}/{season}" if base else season
        if isinstance(arcs, list):
            for i, entry in enumerate(arcs):
                if not isinstance(entry, dict):
                    continue
                if entry.get("placeholder"):
                    continue
                out.extend(story_issues(entry, f"{sp}[{i}]"))
        elif isinstance(arcs, dict):
            for arc, entries in arcs.items():
                ap = f"{sp}/{arc}"
                if not isinstance(entries, list):
                    continue
                for i, entry in enumerate(entries):
                    if not isinstance(entry, dict):
                        continue
                    if entry.get("placeholder"):
                        continue
                    out.extend(story_issues(entry, f"{ap}[{i}]"))
    return out


def main() -> int:
    data = json.loads(JSON_PATH.read_text(encoding="utf-8"))
    issues = walk(data)
    if issues:
        print("Problems:", file=sys.stderr)
        for line in issues:
            print(line, file=sys.stderr)
        return 1
    print(f"OK: {JSON_PATH.relative_to(ROOT.parent)}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
