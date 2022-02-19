import axios from 'axios';
import { API_SERVER_URL } from '../../common/constants/Constants';
class CartService {
  removeDuplicates(originalArray, prop) {
    var newArray = [];
    var lookupObject = {};

    for (var i in originalArray) {
      lookupObject[originalArray[i][prop]] = originalArray[i];
    }

    for (i in lookupObject) {
      newArray.push(lookupObject[i]);
    }
    return newArray;
  }

  addToCartOnLocalStorage(product, selectedStock, productQuantity) {
    product = { ...product, stock: selectedStock };

    //to store cart product in localStorage
    const oldproduct = localStorage.getItem('products')
      ? localStorage.getItem('products')
      : '[]';

    if (oldproduct.length > 0) {
      const arrayproduct = JSON.parse(oldproduct);
      arrayproduct.push(product);
      localStorage.setItem(
        'products',
        JSON.stringify(this.removeDuplicates(arrayproduct, 'productId'))
      );
    } else {
      localStorage.setItem('products', JSON.stringify(product));
    }

    localStorage.setItem(product.productId, productQuantity);
  }

  removeFromCartOnLocalStorage(product, productQuantity) {
    if (productQuantity === 0) {
      const oldproduct = localStorage.getItem('products');
      const arrayproduct = JSON.parse(oldproduct);
      const newArray = arrayproduct.filter(
        (e1) => e1.productId !== product.productId
      );

      localStorage.setItem('products', JSON.stringify(newArray));
      localStorage.removeItem(product.productId);
    } else {
      localStorage.setItem(product.productId, productQuantity);
    }
  }

  addProductsToCartDB(product, stockId, productQuantity) {
    const user_id = sessionStorage.getItem('user_id');
    const token = sessionStorage.getItem('token');
    axios
      .post(
        `${API_SERVER_URL}/carts/add`,
        {
          productQuantity: productQuantity,
          product: {
            productId: product.productId,
          },
          stock: {
            stockId: stockId,
          },

          user: {
            id: user_id,
          },
        },
        {
          headers: {
            Authorization: token,
          },
        }
      )
      .then()
      .catch((error) => {
        console.log(error);
      });
  }

  removeProductsFromCartDB(product, stockId, productQuantity) {
    const user_id = sessionStorage.getItem('user_id');
    const token = sessionStorage.getItem('token');
    axios
      .put(
        `${API_SERVER_URL}/carts/remove`,
        {
          productQuantity: productQuantity,
          product: {
            productId: product.productId,
          },
          stock: {
            stockId: stockId,
          },
          user: {
            id: user_id,
          },
        },
        { headers: { Authorization: token } }
      )
      .then()
      .catch((error) => {
        console.log(error);
      });
  }

  getProductsLength() {
    return localStorage.getItem('products')
      ? JSON.parse(localStorage.getItem('products')).length
      : 0;
  }

  getAllProductsInCart() {
    return JSON.parse(localStorage.getItem('products'));
  }

  setAllProductsInCartToDB() {
    let allProducts = this.getAllProductsInCart();
    allProducts &&
      allProducts.map((product) => {
        this.addProductsToCartDB(
          product,
          product.stock.stockId,
          this.getProductQuantityInCart(product.productId)
        );
      });
  }

  getAllProductsInCartFromAPI(email, token) {
    axios
      .get(`${API_SERVER_URL}/carts/${email}`, {
        headers: {
          Authorization: token,
        },
      })
      .then((response) => {
        for (let i = 0; i < response.data.length; i++) {
          this.addToCartOnLocalStorage(
            response.data[i].product,
            response.data[i].stock,
            response.data[i].productQuantity
          );
        }
      })
      .then()
      .catch((error) => {
        console.log(error);
      });
  }

  getAllProductsForCheckout() {
    const userId = sessionStorage.getItem('user_id');
    const token = sessionStorage.getItem('token');
    return axios.get(`${API_SERVER_URL}/carts/id/${userId}`, {
      headers: {
        Authorization: token,
      },
    });
  }
  getProductQuantityInCart(productId) {
    return localStorage.getItem(productId);
  }

  removeAllProductsFromCart() {
    localStorage.clear();
    let user_id = sessionStorage.getItem('user_id');
    const token = sessionStorage.getItem('token');
    user_id &&
      axios
        .delete(`${API_SERVER_URL}/carts/remove/all/${user_id}`, {
          headers: {
            Authorization: token,
          },
        })
        .catch((error) => {
          console.log(error);
        });
  }
}

export default new CartService();
