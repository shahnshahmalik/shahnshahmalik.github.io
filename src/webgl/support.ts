let gpuOK: boolean | null = null;

function probe(allowSoftware: boolean): boolean {
  try {
    const canvas = document.createElement('canvas');
    const attrs: WebGLContextAttributes = {
      failIfMajorPerformanceCaveat: !allowSoftware,
      powerPreference: 'low-power',
      antialias: false,
    };
    const gl = canvas.getContext('webgl2', attrs) || canvas.getContext('webgl', attrs);
    if (!gl) return false;
    let software = false;
    if (!allowSoftware) {
      const debug = gl.getExtension('WEBGL_debug_renderer_info');
      if (debug) {
        const renderer = String(gl.getParameter(debug.UNMASKED_RENDERER_WEBGL) || '');
        software = /swiftshader|llvmpipe|softpipe|software|microsoft basic render/i.test(renderer);
      }
    }
    gl.getExtension('WEBGL_lose_context')?.loseContext();
    return !software;
  } catch {
    return false;
  }
}

/** Desktop hardware WebGL. Narrow screens and software renderers stay on the 2D diagrams. */
export function useWebGL(): boolean {
  const mode = new URLSearchParams(location.search).get('diagram');
  if (mode === '2d') return false;
  const narrow = window.matchMedia('(max-width: 800px)').matches;
  if (narrow && mode !== '3d') return false;
  if (gpuOK === null) gpuOK = probe(mode === '3d');
  return gpuOK;
}
