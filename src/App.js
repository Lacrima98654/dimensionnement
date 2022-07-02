import './App.css';
import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css';

function App() {
  //Formulaires
  const [G, setG] = useState('');
  const [Q, setQ] = useState('');
  const [B, setB] = useState('');
  const [fc28, setFc28] = useState('');
  const [fe, setFe] = useState('');
  const [gammaS, setGammaS] = useState('1.15');
  const [fissuration, setFissuration] = useState('1');
  const [coefficient, setCoefficient] = useState('1');

  //Page en cours
  const [page, setPage] = useState(1);

  //Valeurs à afficher
  const [ft28, setFt28] = useState(0);
  const [fsu, setFsu] = useState(0);
  const [Au, setAu] = useState(0);
  const [Aser, setAser] = useState(0);
  const [Amin, setAmin] = useState(0);
  const [Ast, setAst] = useState(0);
  const [contrainte, setContrainte] = useState(0);
  let Nu, Nser;

  const { min, max, sqrt } = Math;

  const handleGChange = (e) => {
    setG(e.target.value);
  };
  const handleQChange = (e) => {
    setQ(e.target.value);
  };
  const handleBChange = (e) => {
    setB(e.target.value);
  };
  const handlefc28Change = (e) => {
    setFc28(e.target.value);
  };
  const handlefeChange = (e) => {
    setFe(e.target.value);
  };
  const handlegammaSChange = (e) => {
    setGammaS(e.target.value);
  };
  const handleFissurationChange = (e) => {
    setFissuration(e.target.value);
  };
  const handleCoefChange = (e) => {
    setCoefficient(e.target.value);
  };
  const handleSubmit = (e) => {
    Nu = 1.35 * Number(G) + 1.5 * Number(Q);
    Nser = Number(G) + Number(Q);
    let valFt28 = 0.6 + 0.06 * Number(fc28);
    let valFsu = Number(fe) / Number(gammaS);
    let valAu = Nu / valFsu;
    let valAmin = Number(B) * (valFt28 / Number(fe)),
      valcontrainte;

    switch (fissuration) {
      case '1':
        valcontrainte = Number(fe);
        break;
      case '2':
        valcontrainte = min(
          Number(fe) * (2 / 3),
          max(Number(fe) * (1 / 2), 110 * sqrt(Number(coefficient) * valFt28))
        );
        break;
      case '3':
        valcontrainte =
          0.8 *
          min(
            Number(fe) * (2 / 3),
            max(Number(fe) * (1 / 2), 110 * sqrt(Number(coefficient) * valFt28))
          );
        break;
      default:
        alert("Une erreur s'est produite");
        break;
    }
    let valAser = Nser / valcontrainte;
    let valAst = max(valAu, valAser, valAmin);

    setContrainte(valcontrainte);
    setFt28(valFt28);
    setFsu(valFsu);
    setAu(valAu);
    setAser(valAser);
    setAmin(valAmin);
    setAst(valAst);
    setPage(2);
    e.preventDefault();
  };

  return (
    <div className="App">
      <div className="container ">
        <div className="card my-3">
          <div className="card-header text-uppercase text-center bg-primary bg-gradient text-white ">
            <h3 className="mt-2">Dimensionnement en traction simple</h3>
          </div>
          <div className="card-body">
            {page === 1 ? (
              <form onSubmit={handleSubmit}>
                <div className="mb-3 ">
                  <label htmlFor="G" className="form-label text-secondary">
                    Charges permanentes G:
                  </label>
                  <input
                    type="number"
                    name="G"
                    id="G"
                    value={G}
                    onChange={handleGChange}
                    placeholder="Entrez la valeur"
                    className="form-control"
                  />
                </div>
                <div className="mb-3 ">
                  <label htmlFor="Q" className="form-label text-secondary">
                    Charges variables Q:
                  </label>
                  <input
                    type="number"
                    name="Q"
                    id="Q"
                    value={Q}
                    onChange={handleQChange}
                    placeholder="Entrez la valeur"
                    className="form-control"
                  />
                </div>
                <div className="mb-3 ">
                  <label htmlFor="B" className="form-label text-secondary">
                    Section totale du beton tendu B (m<sup>2</sup>):
                  </label>
                  <input
                    type="number"
                    name="B"
                    id="B"
                    value={B}
                    onChange={handleBChange}
                    placeholder="Entrez la valeur"
                    className="form-control"
                  />
                </div>
                <div className="mb-3 ">
                  <label htmlFor="fc28" className="form-label text-secondary">
                    Resistance caractéristique du béton à la compression fc
                    <sub>28</sub> (MPa):
                  </label>
                  <input
                    type="number"
                    name="fc28"
                    id="fc28"
                    value={fc28}
                    onChange={handlefc28Change}
                    placeholder="Entrez la valeur"
                    className="form-control"
                  />
                </div>
                <div className="mb-3 ">
                  <label htmlFor="fe" className="form-label text-secondary">
                    Limite d'élasticité de l'acier fe (MPa):
                  </label>
                  <input
                    type="number"
                    name="fe"
                    id="fe"
                    value={fe}
                    onChange={handlefeChange}
                    placeholder="Entrez la valeur"
                    className="form-control"
                  />
                </div>
                <div className="mb-3 ">
                  <label htmlFor="gammaS" className="form-label text-secondary">
                    Choisir la valeur de ˠ<sub>s</sub>
                  </label>
                  <select
                    className="form-select"
                    value={gammaS}
                    onChange={handlegammaSChange}
                  >
                    <option value="1.15">1.15 à l'ELU</option>
                    <option value="1">1 à l'ELA</option>
                  </select>
                </div>
                <div className="mb-3 ">
                  <label
                    htmlFor="fissuration"
                    className="form-label text-secondary"
                  >
                    Cas de fissuration
                  </label>
                  <select
                    className="form-select "
                    value={fissuration}
                    onChange={handleFissurationChange}
                  >
                    <option value="1">Fissuration peu préjudiciable</option>
                    <option value="2">Fissuration préjudiciable</option>
                    <option value="3">Fissuration très préjudiciable</option>
                  </select>
                </div>
                {fissuration !== '1' && (
                  <div className="mb-3 ">
                    <label
                      htmlFor="coefficient"
                      className="form-label text-secondary"
                    >
                      Coefficient de fissuration
                    </label>
                    <select
                      id="coefficient"
                      className="form-select "
                      value={coefficient}
                      onChange={handleCoefChange}
                    >
                      <option value="1">1 pour acier ronds lisses</option>
                      <option value="1.16">1.6 pour acier HA</option>
                      <option value="1.8">
                        1.8 pour diamètre {'<'} 0.6mm{' '}
                      </option>
                    </select>
                  </div>
                )}
                {G && Q && B && fc28 && fe ? (
                  <div className="mb-3 row justify-content-center">
                    <button
                      className="btn btn-primary col-12 col-md-3"
                      type="submit"
                    >
                      Calculer
                    </button>
                  </div>
                ) : (
                  <div className="text-danger text-center mt-3">
                    Entrez toutes les valeurs
                  </div>
                )}
              </form>
            ) : (
              <div>
                <div className="row justify-content-around">
                  <button
                    className="btn btn-primary col-5 col-md-3"
                    onClick={() => {
                      setPage(1);
                    }}
                  >
                    Retour
                  </button>
                  <button
                    className="btn btn-primary col-5 col-md-3"
                    onClick={() => {
                      setG('');
                      setQ('');
                      setB('');
                      setFc28('');
                      setFe('');
                      setGammaS('1.15');
                      setFissuration('1');
                      setCoefficient('1');
                      setPage(1);
                    }}
                  >
                    Nouveau Calcul
                  </button>
                </div>
                <div className="text-success text-center mt-3">Résulat</div>
                <div>
                  <table className="table table-success table-striped text-center">
                    <thead>
                      <tr>
                        <th scope="col">Désignation</th>
                        <th scope="col">Valeur</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>
                          ft<sub>28</sub>
                        </td>
                        <td>{ft28.toFixed(4)} MPa</td>
                      </tr>
                      <tr>
                        <td>
                          f<sub>su</sub>
                        </td>
                        <td>{fsu.toFixed(4)} MPa</td>
                      </tr>
                      <tr>
                        <td>
                          A<sub>u</sub>
                        </td>
                        <td>
                          {Au.toFixed(4)} m<sup>2</sup>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          A<sub>ser</sub>
                        </td>
                        <td>
                          {Aser.toFixed(4)} m<sup>2</sup>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          A<sub>min</sub>
                        </td>
                        <td>
                          {Amin.toFixed(4)} m<sup>2</sup>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          A<sub>st</sub>
                        </td>
                        <td>
                          {Ast.toFixed(4)} m<sup>2</sup>
                        </td>
                      </tr>
                      <tr>
                        <td>Contrainte</td>
                        <td>{contrainte.toFixed(4)}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
          <div className="card-footer text-center">
            <small>
              Réalisé par{' '}
              <a href="https://web.facebook.com/rom.kakpo.1">Roméo Kakpo</a>
            </small>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
