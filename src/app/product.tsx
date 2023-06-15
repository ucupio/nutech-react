import { FormEvent, useEffect, useRef, useState } from 'react';
import Container from './components/Container';
import { Product } from './types';
import { FaPlus, FaSearch } from 'react-icons/fa';
import { BiLoader } from 'react-icons/bi';
import { MdDelete, MdEdit } from 'react-icons/md';
import Modal from './components/Modal';
import useToken from './hooks/useToken';

interface ModalState {
  edit: boolean;
  add: boolean;
  delete: boolean;
  error: boolean;
}

export default function Products() {
  const { token } = useToken();
  const [product, setProduct] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [inputProduct, setInputProduct] = useState<Product>({
    productname: '',
    sellingprice: '',
    buyingprice: '',
    stock: '',
    image: '',
    _id: '',
  });
  const [openModal, setOpenModal] = useState<ModalState>({
    add: false,
    edit: false,
    delete: false,
    error: false,
  });

  const inputImage = useRef(null);

  const getProducts = async (value = '') => {
    fetch(
      'https://shark-app-y5u3o.ondigitalocean.app/api/products',
      {
        mode: 'cors',
        method: 'GET',
        headers: {
          'Content-Type': 'application/JSON',
        },
      }
      // 'https://jsonplaceholder.typicode.com/users'
    )
      .then((data) => {
        return data.json();
      })
      .then((result) => {
        let newProduct = [];
        if (Array.isArray(result)) {
          newProduct = result?.filter((item: Product) => {
            if (item.productname !== undefined) {
              return item.productname.includes(value);
            }
            return false;
          });
        }
        setProduct(newProduct);
      });
  };
  const addProduct = async (payload: FormEvent) => {
    setIsLoading(true);
    handleCloseModal();
    const newData = new FormData();
    newData.append('productname', inputProduct.productname);
    newData.append('buyingprice', inputProduct.buyingprice);
    newData.append('sellingprice', inputProduct.sellingprice);
    newData.append('stock', inputProduct.stock);
    newData.append('image', inputImage.current?.files?.[0]);

    payload.preventDefault();
    fetch('https://shark-app-y5u3o.ondigitalocean.app/api/products', {
      mode: 'cors',
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: newData,
    }).then((data) => {
      setIsLoading(false);
      return data.json();
    });
  };
  const editProduct = async (payload: FormEvent) => {
    setIsLoading(true);
    handleCloseModal();
    const newData = new FormData();
    newData.append('productname', inputProduct.productname);
    newData.append('buyingprice', inputProduct.buyingprice);
    newData.append('sellingprice', inputProduct.sellingprice);
    newData.append('stock', inputProduct.stock);
    newData.append('image', inputImage.current?.files?.[0]);

    payload.preventDefault();
    fetch(
      `https://shark-app-y5u3o.ondigitalocean.app/api/products/${inputProduct._id}`,
      {
        mode: 'cors',
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: newData,
      }
    ).then((data) => {
      setIsLoading(false);
      getProducts();
      return data.json();
    });
  };
  const deleteProduct = async (payload: FormEvent) => {
    setIsLoading(true);
    handleCloseModal();

    payload.preventDefault();
    fetch(
      `https://shark-app-y5u3o.ondigitalocean.app/api/products/${inputProduct._id}`,
      {
        mode: 'cors',
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    ).then((data) => {
      setIsLoading(false);
      getProducts();
      return data.json();
    });
  };
  useEffect(() => {
    getProducts();
  }, []);
  useEffect(() => {
    console.log(product);
  }, [product]);

  const handleCloseModal = () => {
    setOpenModal({
      ...openModal,
      edit: false,
      delete: false,
      add: false,
      error: false,
    });
  };
  return (
    <Container>
      {isLoading && (
        <Modal onClose={handleCloseModal} withNoClose>
          <div className="flex justify-center items-center p-20 w-full h-full">
            <BiLoader className="animate animate-spin" />
          </div>
        </Modal>
      )}
      {openModal.delete && (
        <Modal onClose={handleCloseModal}>
          <div className="flex flex-col justify-center items-center w-full h-full p-16 gap-4">
            <span className="italic">
              Are you sure want to delete this product?
            </span>
            <div className="flex items-center gap-2">
              <button
                className="rounded border bg-red-300 px-4 py-1"
                onClick={deleteProduct}
              >
                Ok
              </button>
              <button className="rounded border bg-orange-300 px-4 py-1">
                No
              </button>
            </div>
          </div>
        </Modal>
      )}
      {openModal.add && (
        <Modal onClose={handleCloseModal}>
          <div className="w-full text-center pt-6 font-bold font-serif">
            Add Product
          </div>
          <form
            encType="multipart/form-data"
            method="POST"
            className="flex flex-col w-full p-6 gap-4"
            onSubmit={(e) => addProduct(e)}
          >
            <input
              name="productname"
              placeholder="Nama"
              className="border rounded p-1"
              onChange={(e) =>
                setInputProduct({
                  ...inputProduct,
                  productname: e.target.value,
                })
              }
            />
            <input
              name="buyingprice"
              placeholder="Harga beli"
              className="border rounded p-1"
              onChange={(e) =>
                setInputProduct({
                  ...inputProduct,
                  buyingprice: e.target.value,
                })
              }
            />
            <input
              name="sellingprice"
              placeholder="Harga Jual"
              className="border rounded p-1"
              onChange={(e) =>
                setInputProduct({
                  ...inputProduct,
                  sellingprice: e.target.value,
                })
              }
            />
            <input
              name="stock"
              placeholder="Stok Barang"
              className="border rounded p-1"
              onChange={(e) =>
                setInputProduct({
                  ...inputProduct,
                  stock: e.target.value,
                })
              }
            />
            <input
              name="image"
              type="file"
              placeholder="Gambar Product"
              className="border rounded p-1"
              ref={inputImage}
            />
            <button className="text-white p-2 rounded bg-green-800">
              Tambahkan
            </button>
          </form>
        </Modal>
      )}
      {openModal.edit && (
        <Modal onClose={handleCloseModal}>
          <div className="w-full text-center pt-6 font-bold font-serif">
            Change Product
          </div>
          <form
            encType="multipart/form-data"
            method="POST"
            className="flex flex-col w-full p-6 gap-4"
            onSubmit={(e) => editProduct(e)}
          >
            <input
              name="productname"
              placeholder="Nama"
              className="border rounded p-1"
              defaultValue={inputProduct.productname}
              onChange={(e) =>
                setInputProduct({
                  ...inputProduct,
                  productname: e.target.value,
                })
              }
            />
            <input
              name="buyingprice"
              placeholder="Harga beli"
              className="border rounded p-1"
              defaultValue={inputProduct.buyingprice}
              onChange={(e) =>
                setInputProduct({
                  ...inputProduct,
                  buyingprice: e.target.value,
                })
              }
            />
            <input
              name="sellingprice"
              placeholder="Harga Jual"
              className="border rounded p-1"
              defaultValue={inputProduct.sellingprice}
              onChange={(e) =>
                setInputProduct({
                  ...inputProduct,
                  sellingprice: e.target.value,
                })
              }
            />
            <input
              name="stock"
              placeholder="Stok Barang"
              className="border rounded p-1"
              defaultValue={inputProduct.stock}
              onChange={(e) =>
                setInputProduct({
                  ...inputProduct,
                  stock: e.target.value,
                })
              }
            />
            <input
              name="image"
              type="file"
              placeholder="Gambar Product"
              className="border rounded p-1"
              ref={inputImage}
            />
            <button className="text-white p-2 rounded bg-green-800">
              Tambahkan
            </button>
          </form>
        </Modal>
      )}
      <div className="flex flex-col w-full">
        <div className="flex justify-between items-center self-center w-full gap-2">
          <form className="flex items-center w-full md:w-6/12 gap-2">
            <input
              name="search"
              className="w-full rounded-full border px-6 py-1"
              onChange={(e) => getProducts(e.target.value)}
            />
            <button
              type="submit"
              className="bg-green-800 p-2 rounded-full text-white"
            >
              <FaSearch />
            </button>
          </form>
          <button
            className="flex items-center px-4 gap-1 text-sm bg-green-800 py-2 rounded-full text-white"
            onClick={() => setOpenModal({ ...openModal, add: true })}
          >
            <FaPlus /> <span>Add</span>
          </button>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 justify-center items-center my-6 gap-4">
          {product.map((item) => {
            const nameArray = item.productname.split(' ');
            const title = nameArray[0];
            const description = nameArray.slice(1, nameArray.length - 1);
            const price = item.sellingprice;
            const priceTag =
              price.length <= 3
                ? `Rp ${price}`
                : `Rp ${price.slice(0, price.length - 3)}.${price.slice(
                    price.length - 3,
                    price.length
                  )}`;

            return (
              <div className="relative w-full rounded border shadow-sm p-2">
                <img src={item.image} alt="" />
                <div className="flex flex-col">
                  <span className="text-lg">{title}</span>
                  <span className="text-sm">{description}</span>
                  <span className="text-xl font-bold">{priceTag}</span>
                </div>
                <MdDelete
                  className="absolute bottom-4 right-14 border-2 border-red-300 rounded-md cursor-pointer"
                  color="lightred"
                  size={32}
                  onClick={() => {
                    setOpenModal({ ...openModal, delete: true });
                    setInputProduct({ ...item });
                  }}
                />
                <MdEdit
                  className="absolute bottom-4 right-4 border-2 border-green-300 rounded-md cursor-pointer"
                  color="lightgreen"
                  size={32}
                  onClick={() => {
                    setOpenModal({ ...openModal, edit: true });
                    setInputProduct({ ...item });
                  }}
                />
              </div>
            );
          })}
        </div>
      </div>
    </Container>
  );
}
