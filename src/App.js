import "./App.css";
import data from "./data";
import { useState } from "react";

function App() {
  let [product, setProduct] = useState(data);

  let deleteTexnika = (id) => {
    let filterDelete = product.filter((texnika) => {
      return texnika.id !== id;
    });
    setProduct(filterDelete);
  };
  let mapOption = data.map((product) => {
    return product.brand;
  });
  let mapOptinCategory = data.map((texnika) => {
    return texnika.category;
  });
  let sellectChange = (brand) => {
    let optionChhange = data.filter((texnika) => {
      return texnika.brand == brand;
    });
    if (brand == "all") {
      setProduct(data);
    } else {
      setProduct(optionChhange);
    }
  };
  let ratingChange = (rting) => {
    let rating = data
      .filter((texnika) => {
        return rting >= texnika.rating;
      })
      .sort((a, b) => {
        return a.rating - b.rating;
      });

    setProduct(rating.reverse());
  };
  let priceChangeSort = (priceName) => {
    let sortPrice = data.sort((a, b) => {
      return a.price - b.price;
    });

    if (priceName == "expensive") {
      setProduct(sortPrice);
    } else {
      setProduct(sortPrice.reverse());
    }
  };

  let filterCategory = (cayegory) => {
    let filterName = data.filter((texnika) => {
      return texnika.category == cayegory;
    });
    if (cayegory == "all") {
      setProduct(data);
    } else {
      setProduct(filterName);
    }
  };
  let saleFilter = (sale) => {
    let saleFilterEnd = data.filter((texnika) => {
      if (sale == "sale-big") {
        return texnika.discountPercentage > 14;
      }else{
        return texnika.discountPercentage < 9
      }
    });
    setProduct(saleFilterEnd)

  };
  return (
    <div>
      <header>
        <select onChange={(e) => sellectChange(e.target.value)}>
          <option value="all">All</option>
          {[...new Set(mapOption)].map((texnika) => {
            return <option value={texnika}>{texnika}</option>;
          })}
        </select>
        <select
          onChange={(e) => {
            ratingChange(e.target.value);
          }}
        >
          <option value={5}>Rating: 5</option>
          <option value={4.7}>Rating: 4.7</option>
          <option value={4.5}>Rating: 4.5</option>
          <option value={4.2}>Rating: 4.2</option>
          <option value={4}>Rating: 4</option>
        </select>
        {/* <select
            onChange={(e) => {
              priceChangeSort(e.target.value);
            }}
          >
            <option value="cheaper">Сheaper</option>
            <option value="expensive">Expensive</option>
          </select> */}
        <select
          onChange={(e) => {
            filterCategory(e.target.value);
          }}
        >
          <option value="all"> Category All</option>
          {[...new Set(mapOptinCategory)].map((texnika) => {
            return <option value={texnika}>{texnika}</option>;
          })}
        </select>
        <select
          onChange={(e) => {
            saleFilter(e.target.value);
          }}
        >
          <option value="sale-big">Sale big</option>
          <option value="sale-small">Sale small</option>
        </select>
      </header>
      <ul>
        {product.map((texnika) => {
          let {
            id,
            title,
            description,
            thumbnail,
            price,
            category,
            brand,
            rating,
            discountPercentage,
          } = texnika;
          return (
            <li key={id}>
              <img src={thumbnail} width={400} height={300} />
              <h1>
                <b>Title</b>: {title}
              </h1>
              <p>
                <b>Brand</b>: {brand}
              </p>
              <p>
                <b>Description</b>:{description}
              </p>
              <p>
                <b>Price</b> : {price} ${" "}
                <span>Sale: {discountPercentage}%</span>
              </p>
              <p>
                <b>Rating</b>: {rating}
              </p>
              <p>
                <b>Category</b>:{category}
              </p>
              <button
                onClick={() => {
                  deleteTexnika(id);
                }}
              >
                Delete
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default App;
