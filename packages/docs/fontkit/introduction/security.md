# Security

## Risks

There is a very high likelihood that corrupt or malicious font data will lead
to unpredictable behavior when processed by `@fontkit`. While pull requests
that mitigate or eliminate these risks are highly welcome, you should not
expect `fontkit` to become entirely risk-free in the near future.

Unpredictable behavior includes unhandled exceptions, memory exhaustion (OOM) 
crashes, infinite loops that block the Node.js event loop, or maximum call stack
size errors.

If your application processes user-uploaded or untrusted font files, **do not
expose `fontkit` directly to the front line.** Font parsing should always be
treated as an untrusted, high-risk operation. 

## Countermeasures

It is strongly recommended to implement the following defense-in-depth measures:

* **Isolate Processing in Worker Threads:** Never parse fonts on your main server thread. Move `fontkit` execution to a `Worker` thread or an isolated microservice. If a malicious font triggers an infinite loop or an out-of-memory crash, it will only destroy that specific worker, which can be safely restarted by a supervisor process.
* **Set Strict Timeouts:** Implement a hard execution timeout on the thread or process parsing the font. If parsing takes longer than a few seconds, terminate the worker immediately to prevent resource exhaustion.
* **Pre-validate with Hardened Tools:** Before passing a font file to JavaScript, run it through a dedicated binary sanitizer. For example, Google's [ots (OpenType Sanitizer)](https://github.com/khaledhosny/ots) is specifically designed to parse font files defensively, strip out malicious data, and output a safe file. If `ots` rejects the file, do not pass it to `fontkit`.
* **Enforce File Size Constraints:** Check and enforce strict upfront limits on incoming file sizes (e.g., rejecting any font over 20–30MB) before parsing ever begins to mitigate basic memory-stuffing attempts.
