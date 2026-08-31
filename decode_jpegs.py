#!/usr/bin/env python3
import base64
from pathlib import Path

src = Path("img-b64")
dst = Path("img")
dst.mkdir(exist_ok=True)
for f in sorted(src.glob("*.b64")):
    name = f.name[:-4]
    raw = base64.b64decode("".join(f.read_text().split()))
    print(name, len(raw), raw[:3])
    assert raw[:3] == b"\xff\xd8\xff", name
    (dst / name).write_bytes(raw)
probe = dst / "_probe.jpg"
if probe.exists():
    probe.unlink()
    print("removed _probe.jpg")
