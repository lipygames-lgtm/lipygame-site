// GERADO por tools/gera-desafios.mjs — não editar à mão (mude lá e rode de novo).
// Fases do DESAFIO RELÂMPAGO, 8 de cada tipo. Mesmos campos de fases.js, mais:
// coracoes: corações da fase (o Classic normal tem 3) · chefe: luta contra um chefe (o jogo sorteia qual)
(function (raiz) {
  const DESAFIOS = {"relogio":[{"w":7,"h":8,"g":"..RuD.Dlllu...L.U..X..X.U...U..rrR.U.u.d..llDUl.LDLlu..3","p":10,"n":28,"pen":2,"a":0.8,"t":45,"e":28.8},
  {"w":7,"h":9,"g":"U.rU.UrU....DUU...5.R.X...4ulDl.X.R...X.rrrdU.R.rR.Ud.RRUD.r.rU","p":9,"n":32,"pen":2,"a":0.8,"t":45,"e":27.4},
  {"w":8,"h":9,"g":"..r..UrU.Xr.RR.R.XR..8RrlLLLd.L..X..R3.dllULd..Ld..LD.l.L...DX..DDdDL3uD","p":12,"n":38,"pen":2,"a":0.8,"t":65,"e":43.6},
  {"w":7,"h":9,"g":"R.u.U.R.d...drL.RRuRU.DrR.R.4.lXX..U....L.DL.....R.UdD.dRrDDDRD","p":11,"n":34,"pen":2,"a":0.8,"t":50,"e":30.3},
  {"w":8,"h":9,"g":"L.U..uRRUdl..RR.L.u...URL..5X.r2Ul.DlUULrdUD..DUlLlL.X..dL...X..dL.d..RD","p":10,"n":40,"pen":2,"a":0.8,"t":55,"e":35.9},
  {"w":8,"h":10,"g":"llL.RrUrLLL..X.u..U.U.22.XR.r..Rr..d...R..Lr.RdUl..LLXD..XU.rD.RlDLDuDl.dlUD3DRD","p":12,"n":46,"pen":2,"a":0.8,"t":70,"e":45.4},
  {"w":7,"h":9,"g":"uD...rrLrRdDUrul..L...Rr...rLL.r..Rl.d.lX.llDll..LLd..X7dlDLL..","p":9,"n":37,"pen":2,"a":0.8,"t":40,"e":26.9},
  {"w":8,"h":9,"g":"UuXUU.d.ul..uX.2llL.l.d.dUdU..l..R.d.RDD..rdudrRL....DRR8LldXd.Dd..D.ddD","p":10,"n":43,"pen":2,"a":0.8,"t":50,"e":34.1}],
  "coracao":[{"w":7,"h":9,"g":"4u..u..dUX.u..ll.rRRrd.l.L..lL...X.RU.urrrl.3.u.XrrdrRrrRUrrDDD","p":11,"n":38,"coracoes":1},
  {"w":8,"h":9,"g":".U.uuUL...X..UX..r.8RuDRD..u..L.L.LulrRRLR..u.dDLLLL.4lrr.duDURdlU7XdXRr","p":13,"n":44,"coracoes":1},
  {"w":8,"h":9,"g":"UDUllU1RLlr.u3ruLll..l..LdUd.uL.XR.r.URRlL.R1rRRLlXR5..D.d.dXX.RXd.D..UD","p":17,"n":45,"coracoes":1},
  {"w":8,"h":10,"g":"lduu.u.RL.L.XrrrLLUU.u.Rr.ruduruU.L...X.dlU..L..dD..RrrRLrd..u.DLr7.D..DLl3XRRDd","p":15,"n":51,"coracoes":1},
  {"w":7,"h":9,"g":"UUlLurRull..U.ldlL.uXll.RuU2d1U.LL.R..u.rR.r..DdrLlXX1rD.d.XddR","p":13,"n":41,"coracoes":1},
  {"w":8,"h":9,"g":"lLuUUuX.LuDlur7rlL..lrRRLL.8L.XXl.lURR.RUU6U.7L.Dll...XXL...RUDDRDdDUdDd","p":15,"n":48,"coracoes":1},
  {"w":8,"h":10,"g":".U.Ud.uLlL57..RRll.r..uUll.lrdRRXuXR..rRLlX...rr.rd.RRurdUD..LRRD.D.lRURdrDuRdrD","p":17,"n":55,"coracoes":1},
  {"w":8,"h":9,"g":"lLluU.udX.U.RdURLl.rrRrrD....dL.LUUUu.8llL.1DLXRlX.2.RDrL.X.drdDlddudLDD","p":14,"n":50,"coracoes":1}],
  "chefe":[{"w":7,"h":8,"g":"uLdd..l.r...Uu.R.DD...u.......drru.D.L5d.XlLLD.X.lUd.rrd","p":11,"n":29,"chefe":true},
  {"w":7,"h":8,"g":"R.UuR1D..U.X..rRUdRrrLll..X.l.L.X...Uu8..lll.L...LLUDLL.","p":10,"n":30,"chefe":true},
  {"w":7,"h":8,"g":"LUlL..ULuDUlXuuD.L..UR.1uuRu..RUd...D.XD..Ll..R.d.d..d..","p":12,"n":31,"chefe":true},
  {"w":7,"h":8,"g":"l.d.L..UL.Du.LdDL..L.Lll..X.R3.R.RdL.ddX.rlld.X.dDDlr.3r","p":12,"n":32,"chefe":true},
  {"w":7,"h":8,"g":".5XRRrULuDUL.uU.LRRru....U..r.d...dllLU..L.XrD.Dr..ddu..","p":10,"n":32,"chefe":true},
  {"w":7,"h":8,"g":"dLUDU.L..rRUrrl.L..X.r..rD.D4XUd..rd..rRrdd..8.XRl.uLrrR","p":10,"n":33,"chefe":true},
  {"w":7,"h":8,"g":"u.Urruu.RU.d..U..l..DD.LU..LdLuulX.L.2.R.RLlDLlX.LUR.R.R","p":9,"n":34,"chefe":true},
  {"w":7,"h":8,"g":"UL.RUrrUUdulX...d.L..8XRdrRR.dLD...Rd.DudRDDLd.2.lDlDX..","p":11,"n":35,"chefe":true}]};
  if (typeof module === 'object' && module.exports) module.exports = DESAFIOS; else raiz.DESAFIOS = DESAFIOS;
})(this);
