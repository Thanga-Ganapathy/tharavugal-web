export default function randomGradientColor() {
  const graidents = [
    'linear-gradient(29deg, #12ceff, #eed321)',
    'linear-gradient(346deg, #ecae09, #25e3c9)',
    'linear-gradient(357deg, #d7ec75, #caa596)',
    'linear-gradient(254deg, #7bdca8, #0798e4)',
    'linear-gradient(291deg, #f16a6e, #618b75)',
    'linear-gradient(213deg, #b49dc2, #e18c5e)',
    'linear-gradient(279deg, #508320, #0e4cab)',
    'linear-gradient(46deg, #fbc36b, #89b60f)',
    'linear-gradient(37deg, #239aa2, #2ed041)',
    'linear-gradient(28deg, #f4db7f, #db663d)',
    'linear-gradient(131deg, #3e589e, #b588c3)',
  ];

  const out = new Set([]);

  while (out.size !== 5) {
    const randIdx = Math.floor(Math.random() * graidents.length);
    out.add(graidents[randIdx]);
  }

  return [...out];
}
