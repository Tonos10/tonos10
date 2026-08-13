export const config = {
  runtime: 'edge',
};

export default async function handler(req) {
  // This is a minimal template for an Edge Function that returns a dynamic SVG.
  // In a real scenario, you would fetch GitHub GraphQL data to get the contribution graph,
  // then map those data points into SVG rects and animate a "ship" shooting them.
  
  const svg = `
    <svg width="800" height="200" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 200">
      <defs>
        <style>
          .bg { fill: transparent; }
          .ship { fill: #8B5CF6; animation: float 3s ease-in-out infinite; }
          .laser { stroke: #C4B5FD; stroke-width: 2; animation: shoot 1s linear infinite; }
          .commit { fill: #39D353; animation: explode 2s ease-out forwards; }
          
          @keyframes float {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-5px); }
          }
          @keyframes shoot {
            0% { stroke-dasharray: 0, 100; stroke-dashoffset: 0; }
            50% { stroke-dasharray: 20, 80; stroke-dashoffset: -50; }
            100% { stroke-dasharray: 0, 100; stroke-dashoffset: -100; }
          }
          @keyframes explode {
            0% { opacity: 1; transform: scale(1); }
            90% { opacity: 1; transform: scale(1); }
            100% { opacity: 0; transform: scale(1.5); }
          }
        </style>
      </defs>
      
      <rect width="100%" height="100%" class="bg" />
      
      <!-- Mock Contribution Graph Asteroids -->
      <g transform="translate(600, 100)">
        <rect x="0" y="0" width="10" height="10" class="commit" style="animation-delay: 0.5s;" />
        <rect x="20" y="-20" width="10" height="10" class="commit" style="animation-delay: 1.5s;" />
        <rect x="-20" y="15" width="10" height="10" class="commit" style="animation-delay: 2.5s;" />
      </g>

      <!-- Ship -->
      <g transform="translate(100, 100)">
        <polygon points="0,-10 20,0 0,10" class="ship" />
        <!-- Laser -->
        <line x1="20" y1="0" x2="500" y2="0" class="laser" />
      </g>
      
      <text x="400" y="180" font-family="Inter, sans-serif" font-size="12" fill="#A3A3A3" text-anchor="middle">
        Simulated Asteroids Contribution SVG
      </text>
    </svg>
  `;

  return new Response(svg, {
    headers: {
      'Content-Type': 'image/svg+xml',
      'Cache-Control': 'public, max-age=3600',
    },
  });
}
