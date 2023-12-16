import { useState, useEffect } from "react";

const SearchBar = (props) => {
  // States for various filters
  const [countries, setCountries] = useState([]);
  const [economicLevels, setEconomicLevels] = useState([]);
  const [grades, setGrades] = useState([]);
  const [years, setYears] = useState([]);
  const [ambients, setAmbients] = useState([]);
  const [languages, setLanguages] = useState([]);

  const [isOptionsVisible, setOptionsVisible] = useState(false);

  const handleToggleOptions = () => {
    setOptionsVisible((prev) => !prev);
  };

  const handleAnimationEnd = () => {
    if (!isOptionsVisible) {
      setOptionsVisible(false);
    }
  };

  const handleSearch = () => {
    const searchText = document.getElementById("searchText").value;
    let query = {
      size: 10000,
      query: {
        bool: {
          must: [
            {
              query_string: {
                query: `*${searchText}*`,
              },
            },
          ],
        },
      },
    };

    // Insert countries into query
    if (countries.length != 0) {
      let countriesBool = {
        bool: {
          should: [],
        },
      };
      for (let country of countries) {
        countriesBool.bool.should.push({
          match: {
            paisDestino: country,
          },
        });
      }
      query.query.bool.must.push(countriesBool);
    }

    // Insert economic levels into query
    if (economicLevels.length != 0) {
      let economicLevelsBool = {
        bool: {
          should: [],
        },
      };
      for (let economicLevel of economicLevels) {
        economicLevelsBool.bool.should.push({
          match: {
            nivelEconomico: economicLevel,
          },
        });
      }
      query.query.bool.must.push(economicLevelsBool);
    }

    // Insert grades into query
    if (grades.length != 0) {
      let gradesBool = {
        bool: {
          should: [],
        },
      };
      for (let grade of grades) {
        gradesBool.bool.should.push({
          match: {
            "gradoPrincipal.keyword": grade,
          },
        });
      }
      query.query.bool.must.push(gradesBool);
    }

    // Insert years into query
    if (years.length != 0) {
      let yearsBool = {
        bool: {
          should: [],
        },
      };
      for (let year of years) {
        yearsBool.bool.should.push({
          match: {
            cursoMovilidad: year,
          },
        });
      }
      query.query.bool.must.push(yearsBool);
    }

    // Insert ambients into query
    if (ambients.length != 0) {
      let ambientsBool = {
        bool: {
          must: [],
        },
      };
      for (let ambient of ambients) {
        ambientsBool.bool.must.push({
          match: {
            ambienteEstudiantil: ambient,
          },
        });
      }
      query.query.bool.must.push(ambientsBool);
    }

    // Insert languages into query
    if (languages.length != 0) {
      let languagesBool = {
        bool: {
          should: [],
        },
      };
      for (let language of languages) {
        languagesBool.bool.should.push({
          match: {
            idiomaClases: language,
          },
        });
      }
      query.query.bool.must.push(languagesBool);
    }

    // Insert interval of money into query
    let minMoney = "0";
    if (document.getElementById("minMoney").value == "") {
      minMoney = "0";
    } else {
      minMoney = document.getElementById("minMoney").value;
    }
    const maxMoney = document.getElementById("maxMoney").value;
    if (minMoney != "" && maxMoney != "") {
      query.query.bool.must.push({
        range: {
          gastoPromedioMensual: {
            gte: minMoney,
            lte: maxMoney,
          },
        },
      });
    }

    // Print the query
    console.log(JSON.stringify(query));

    fetch("http://localhost:9200/experiencias/_search", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(query),
    })
      .then((response) => response.json())
      .then((data) => {
        const hits = data.hits.hits.map(hit => ({ _id: hit._id, ...hit._source }));
        props.onSearch(hits) ;
        for (let experience of hits) {
          console.log(experience._source);
        }
      });
  };

  const handleCountryClick = (event) => {
    const { innerText } = event.target;
    setCountries((prevCountries) =>
      prevCountries.includes(innerText)
        ? prevCountries.filter((item) => item !== innerText)
        : [...prevCountries, innerText]
    );
  };

  const handleEconomicLevelClick = (event) => {
    const { innerText } = event.target;
    setEconomicLevels((prevEconomicLevels) =>
      prevEconomicLevels.includes(innerText)
        ? prevEconomicLevels.filter((item) => item !== innerText)
        : [...prevEconomicLevels, innerText]
    );
  };

  const handleGradeClick = (event) => {
    const { innerText } = event.target;
    setGrades((prevGrades) =>
      prevGrades.includes(innerText)
        ? prevGrades.filter((item) => item !== innerText)
        : [...prevGrades, innerText]
    );
  };

  const handleYearClick = (event) => {
    const { innerText } = event.target;
    setYears((prevYears) =>
      prevYears.includes(innerText)
        ? prevYears.filter((item) => item !== innerText)
        : [...prevYears, innerText]
    );
  };

  const handleAmbientClick = (event) => {
    const { innerText } = event.target;
    setAmbients((prevAmbients) =>
      prevAmbients.includes(innerText)
        ? prevAmbients.filter((item) => item !== innerText)
        : [...prevAmbients, innerText]
    );
  };

  const handleLanguageClick = (event) => {
    const { innerText } = event.target;
    setLanguages((prevLanguages) =>
      prevLanguages.includes(innerText)
        ? prevLanguages.filter((item) => item !== innerText)
        : [...prevLanguages, innerText]
    );
  };

  useEffect(() => {

    // document
    //     .getElementById("toggleOptions")
    //     .addEventListener("click", function () {

    //       options.classList.toggle("fade-in");
    //       options.classList.toggle("fade-out");

    //       // Toggle the 'hidden' className if the element is currently visible
    //       if (options.classList.contains("fade-in")) {
    //         options.classList.remove("hidden");
    //       }

    //       // options.classList.toggle('hidden');
    //     });
    // Listen for the end of the animation
    //   options.addEventListener("animationend", function () {
    //     // Hide the element after the animation is complete
    //     if (!options.classList.contains("fade-in")) {
    //       options.classList.add("hidden");
    //     }
    //   });

    // const searchButton = document.getElementById("searchButton");
    // searchButton.addEventListener("click", function () {

    // });

    // // Country Button Click Handling
    // const countryButtons = document.querySelectorAll(".country-button");
    // countryButtons.forEach((button) => {
    //   button.addEventListener("click", function () {
    //     // Toggle background color on click
    //     this.classList.toggle("bg-gray-500");
    //     // Add or remove the country from the list
    //     if (countries.includes(this.innerText)) {
    //       setCountries(countries.filter(
    //         (country) => country !== this.innerText
    //       ));
    //     } else {
    //       countries.push(this.innerText);
    //     }
    //   });
    // });

    // // Grade Button Click Handling
    // const gradeButtons = document.querySelectorAll(".grade-button");
    // gradeButtons.forEach((button) => {
    //   button.addEventListener("click", function () {
    //     // Toggle background color on click
    //     this.classList.toggle("bg-gray-500");
    //     // Add or remove the grade from the list
    //     if (grades.includes(this.innerText)) {
    //       setGrades(grades.filter((grade) => grade !== this.innerText));
    //     } else {
    //       grades.push(this.innerText);
    //     }
    //   });
    // });

    // // Economic Level Button Click Handling
    // const economicLevelButtons = document.querySelectorAll(
    //   ".economic-level-button"
    // );
    // economicLevelButtons.forEach((button) => {
    //   button.addEventListener("click", function () {
    //     // Toggle background color on click
    //     this.classList.toggle("bg-gray-500");
    //     // Add or remove the country from the list
    //     if (economicLevels.includes(this.innerText.toLowerCase())) {
    //       setEconomicLevels(
    //         economicLevels.filter(
    //           (economicLevel) => economicLevel !== this.innerText.toLowerCase()
    //         )
    //       );
    //     } else {
    //       economicLevels.push(this.innerText.toLowerCase());
    //     }
    //   });
    // });

    // // Year Button Click Handling
    // const yearButtons = document.querySelectorAll(".year-button");
    // yearButtons.forEach((button) => {
    //   button.addEventListener("click", function () {
    //     // Toggle background color on click
    //     this.classList.toggle("bg-gray-500");
    //     // Add or remove the country from the list
    //     if (years.includes(this.innerText)) {
    //       setYears(years.filter((year) => year !== this.innerText));
    //     } else {
    //       years.push(this.innerText);
    //     }
    //   });
    // });

    // // Ambient Button Click Handling
    // const ambientButtons = document.querySelectorAll(".ambient-button");
    // ambientButtons.forEach((button) => {
    //   button.addEventListener("click", function () {
    //     // Toggle background color on click
    //     this.classList.toggle("bg-gray-500");
    //     // Add or remove the country from the list
    //     if (ambients.includes(this.innerText)) {
    //       setAmbients(ambients.filter((ambient) => ambient !== this.innerText));
    //     } else {
    //       ambients.push(this.innerText);
    //     }
    //   });
    // });

    // // Language Button Click Handling
    // const languageButtons = document.querySelectorAll(".language-button");
    // languageButtons.forEach((button) => {
    //   button.addEventListener("click", function () {
    //     // Toggle background color on click
    //     this.classList.toggle("bg-gray-500");
    //     // Add or remove the country from the list
    //     if (languages.includes(this.innerText)) {
    //       setLanguages(
    //         languages.filter((language) => language !== this.innerText)
    //       );
    //     } else {
    //       languages.push(this.innerText);
    //     }
    //   });
    // });
  });
  return (
    <div className="max-w-md mx-auto bg-white p-4 rounded-md shadow-md">
      <div className="flex relative items-center flex-col">
        <div className="flex items-center left-0 w-full">
          <input
            id="searchText"
            type="text"
            placeholder="Search..."
            className="w-full p-2 border border-gray-300 rounded-md"
          />
          <button
            id="searchButton"
            className="ml-2 p-1 bg-gray-300 rounded-md"
            onClick={handleSearch}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="30"
              viewBox="0 0 24 24"
            >
              <title>magnify</title>
              <path d="M9.5,3A6.5,6.5 0 0,1 16,9.5C16,11.11 15.41,12.59 14.44,13.73L14.71,14H15.5L20.5,19L19,20.5L14,15.5V14.71L13.73,14.44C12.59,15.41 11.11,16 9.5,16A6.5,6.5 0 0,1 3,9.5A6.5,6.5 0 0,1 9.5,3M9.5,5C7,5 5,7 5,9.5C5,12 7,14 9.5,14C12,14 14,12 14,9.5C14,7 12,5 9.5,5Z" />
            </svg>
          </button>
          <div className="ml-2 relative">
            <button
              id="toggleOptions"
              onClick={handleToggleOptions}
              className="p-1 bg-gray-300 rounded-md"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="30"
                viewBox="0 0 24 24"
              >
                <title>dots-vertical</title>
                <path d="M12,16A2,2 0 0,1 14,18A2,2 0 0,1 12,20A2,2 0 0,1 10,18A2,2 0 0,1 12,16M12,10A2,2 0 0,1 14,12A2,2 0 0,1 12,14A2,2 0 0,1 10,12A2,2 0 0,1 12,10M12,4A2,2 0 0,1 14,6A2,2 0 0,1 12,8A2,2 0 0,1 10,6A2,2 0 0,1 12,4Z" />
              </svg>
            </button>
          </div>
        </div>
        <div
          id="options"
          className={`${
            isOptionsVisible ? "fade-in" : "fade-out hidden"
          } w-full absolute z-20 top-full right-0 mt-4 bg-white border border-gray-300 rounded-md shadow-md`}
          onAnimationEnd={handleAnimationEnd}
        >
          {/* <!-- Country Buttons --> */}
          <div className="p-2">
            <label className="block text-gray-700">Pais destino:</label>
            <div className="mt-1 flex">
              <button
                className={`mr-2 p-2 border border-gray-300 rounded-md country-button ${
                  countries.includes("Italia") ? "" : "bg-gray-500"
                }`}
                onClick={handleCountryClick}
              >
                Italia
              </button>
              <button
                onClick={handleCountryClick}
                className={`mr-2 p-2 border border-gray-300 rounded-md country-button ${
                  countries.includes("Bulgaria") ? "" : "bg-gray-500"
                }`}
              >
                Bulgaria
              </button>
              <button
                onClick={handleCountryClick}
                className={`mr-2 p-2 border border-gray-300 rounded-md country-button ${
                  countries.includes("Rumanía") ? "" : "bg-gray-500"
                }`}
              >
                Rumanía
              </button>
              <button
                onClick={handleCountryClick}
                className={`mr-2 p-2 border border-gray-300 rounded-md country-button ${
                  countries.includes("Portugal") ? "" : "bg-gray-500"
                }`}
              >
                Portugal
              </button>
              {/* <!-- Add more country buttons as needed --> */}
            </div>
          </div>
          {/* <!-- Economic level selector --> */}
          <div className="p-2">
            <label className="block text-gray-700">Nivel económico:</label>
            <div className="mt-1 flex">
              <button
                className={`mr-2 p-2 border border-gray-300 rounded-md economic-level-button ${
                  economicLevels.includes("Bajo") ? "" : "bg-gray-500"
                }`}
                onClick={handleEconomicLevelClick}
              >
                Bajo
              </button>
              <button
                className={`mr-2 p-2 border border-gray-300 rounded-md economic-level-button ${
                  economicLevels.includes("Medio") ? "" : "bg-gray-500"
                }`}
                onClick={handleEconomicLevelClick}
              >
                Medio
              </button>
              <button
                className={`p-2 border border-gray-300 rounded-md economic-level-button ${
                  economicLevels.includes("Alto") ? "" : "bg-gray-500"
                }`}
                onClick={handleEconomicLevelClick}
              >
                Alto
              </button>
              {/* <!-- Add more grade buttons as needed --> */}
            </div>
          </div>
          {/* <!-- Grade Selector --> */}
          <div className="p-2">
            <label className="block text-gray-700">Grado:</label>
            <div className="mt-1 flex flex-wrap">
              <button
                className={`mr-2 mt-2 p-2 border border-gray-300 rounded-md grade-button ${
                  grades.includes("Educación Primaria") ? "" : "bg-gray-500"
                }`}
                onClick={handleGradeClick}
              >
                Educación Primaria
              </button>
              <button
                className={`mr-2 mt-2 p-2 border border-gray-300 rounded-md grade-button ${
                  grades.includes("Educación Social") ? "" : "bg-gray-500"
                }`}
                onClick={handleGradeClick}
              >
                Educación Social
              </button>
              <button
                className={`mr-2 mt-2 p-2 border border-gray-300 rounded-md grade-button ${
                  grades.includes("Ingeniería Informática") ? "" : "bg-gray-500"
                }`}
                onClick={handleGradeClick}
              >
                Ingeniería Informática
              </button>
              <button
                className={`mr-2 mt-2 p-2 border border-gray-300 rounded-md grade-button ${
                  grades.includes("Educación Infantil") ? "" : "bg-gray-500"
                }`}
                onClick={handleGradeClick}
              >
                Educación Infantil
              </button>
              <button
                className={`mr-2 mt-2 p-2 border border-gray-300 rounded-md grade-button ${
                  grades.includes("ADE") ? "" : "bg-gray-500"
                }`}
                onClick={handleGradeClick}
              >
                ADE
              </button>
              {/* <!-- Add more grade buttons as needed --> */}
            </div>
          </div>
          {/* <!--Main grade year--> */}
          <div className="p-2">
            <label className="block text-gray-700">Curso Movilidad:</label>
            <div className="mt-1 flex flex-wrap">
              <button
                className={`mr-2 mt-2 p-2 border border-gray-300 rounded-md year-button ${
                  years.includes("Tercero") ? "" : "bg-gray-500"
                }`}
                onClick={handleYearClick}
              >
                Tercero
              </button>
              <button
                className={`mr-2 mt-2 p-2 border border-gray-300 rounded-md year-button ${
                  years.includes("Cuarto") ? "" : "bg-gray-500"
                }`}
                onClick={handleYearClick}
              >
                Cuarto
              </button>
              {/* <!-- Add more grade buttons as needed --> */}
            </div>
          </div>
          {/* <!--Ambient Selector--> */}
          <div className="p-2">
            <label className="block text-gray-700">Ambiente:</label>
            <div className="mt-1 flex flex-wrap">
              <button
                className={`mr-2 mt-2 p-2 border border-gray-300 rounded-md ambient-button ${
                  ambients.includes("Fiesta") ? "" : "bg-gray-500"
                }`}
                onClick={handleAmbientClick}
              >
                Fiesta
              </button>
              <button
                className={`mr-2 mt-2 p-2 border border-gray-300 rounded-md ambient-button ${
                  ambients.includes("Deportivo") ? "" : "bg-gray-500"
                }`}
                onClick={handleAmbientClick}
              >
                Deportivo
              </button>
              <button
                className={`mr-2 mt-2 p-2 border border-gray-300 rounded-md ambient-button ${
                  ambients.includes("Cultural") ? "" : "bg-gray-500"
                }`}
                onClick={handleAmbientClick}
              >
                Cultural
              </button>
              <button
                className={`mr-2 mt-2 p-2 border border-gray-300 rounded-md ambient-button ${
                  ambients.includes("Internacional") ? "" : "bg-gray-500"
                }`}
                onClick={handleAmbientClick}
              >
                Internacional
              </button>
              <button
                className={`mr-2 mt-2 p-2 border border-gray-300 rounded-md ambient-button ${
                  ambients.includes("Tranquilo") ? "" : "bg-gray-500"
                }`}
                onClick={handleAmbientClick}
              >
                Tranquilo
              </button>
              <button
                className={`mr-2 mt-2 p-2 border border-gray-300 rounded-md ambient-button ${
                  ambients.includes("Viajes") ? "" : "bg-gray-500"
                }`}
                onClick={handleAmbientClick}
              >
                Viajes
              </button>
              {/* <!-- Add more grade buttons as needed --> */}
            </div>
          </div>

          {/* <!--Language selector--> */}
          <div className="p-2">
            <label className="block text-gray-700">Idioma de las clases:</label>
            <div className="mt-1 flex flex-wrap">
              <button
                className={`mr-2 mt-2 p-2 border border-gray-300 rounded-md language-button ${
                  languages.includes("Inglés") ? "" : "bg-gray-500"
                }`}
                onClick={handleLanguageClick}
              >
                Inglés
              </button>
              <button className={`mr-2 mt-2 p-2 border border-gray-300 rounded-md language-button ${
                  languages.includes("Español") ? "" : "bg-gray-500"
                }`}
                onClick={handleLanguageClick}>
                Español
              </button>
              <button className={`mr-2 mt-2 p-2 border border-gray-300 rounded-md language-button ${
                  languages.includes("Italiano") ? "" : "bg-gray-500"
                }`}
                onClick={handleLanguageClick}>
                Italiano
              </button>
              <button className={`mr-2 mt-2 p-2 border border-gray-300 rounded-md language-button ${
                  languages.includes("Francés") ? "" : "bg-gray-500"
                }`}
                onClick={handleLanguageClick}>
                Francés
              </button>
              <button className={`mr-2 mt-2 p-2 border border-gray-300 rounded-md language-button ${
                  languages.includes("Rumano") ? "" : "bg-gray-500"
                }`}
                onClick={handleLanguageClick}>
                Rumano
              </button>
              <button className={`mr-2 mt-2 p-2 border border-gray-300 rounded-md language-button ${
                  languages.includes("Portugués") ? "" : "bg-gray-500"
                }`}
                onClick={handleLanguageClick}>
                Portugués
              </button>
              {/* <!-- Add more grade buttons as needed --> */}
            </div>
          </div>
          {/* <!-- Money Interval --> */}
          <div className="p-2">
            <label className="block text-gray-700">
              Gasto promedio mensual:
            </label>
            <div className="flex">
              <input
                type="number"
                placeholder="Mínimo"
                className="mt-1 p-2 border border-gray-300 rounded-l-md w-1/2"
                id="minMoney"
              />
              <input
                type="number"
                placeholder="Máximo"
                className="mt-1 p-2 border border-gray-300 rounded-r-md w-1/2"
                id="maxMoney"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
