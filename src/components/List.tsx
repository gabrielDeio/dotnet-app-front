import { useEffect, useState } from "react";
import { Cliente, OptionsEnum } from "./Card";
import { server } from "../services/axios";

export interface Product {
  idProduto: number;
  dscProduto: string;
  vlrUnitario: number;
}

export interface Sales {
  idVenda: number;
  idCliente: number;
  idProduto: number;
  cliente: Cliente;
  produto: Product;
  qtdVenda: number;
  vlrUnitarioVenda: number;
  dthVenda: Date;
  vlrTotalVenda: number;
}

interface ListProps {
  option: OptionsEnum;
  setSelectedCliente: (client: Cliente) => void;
  setIsEditMode: (isEditMode: boolean) => void;
  setSelectedProduct: (product: Product) => void;
  setSelectedSale: (sale: Sales) => void;
}

export function List({
  option,
  setSelectedCliente,
  setIsEditMode,
  setSelectedProduct,
  setSelectedSale,
}: ListProps) {
  const [clients, setClients] = useState<Array<Cliente>>([]);
  const [products, setProducts] = useState<Array<Product>>([]);
  const [sales, setSales] = useState<Array<Sales>>([]);

  useEffect(() => {
    switch (option) {
      case OptionsEnum.CLIENTS:
        getClientsData();
        break;
      case OptionsEnum.PRODUCTS:
        getProductsData();
        break;
      case OptionsEnum.SALES:
        getSalesData();
        break;
    }
  }, [option]);

  async function getClientsData() {
    const response = await server.get("/api/Cliente");
    setClients(response.data);
  }
  async function getProductsData() {
    const response = await server.get("/api/Produto");
    setProducts(response.data);
  }
  async function getSalesData() {
    const response = await server.get("/api/Venda");
    setSales(response.data);
  }

  async function peformDelete(id: number, type: string) {
    try {
      const response = await server.delete(`/api/${type}/${id}`);
      if (response.data) alert(`${type} ${id} excluida com sucesso!`);
      switch (type) {
        case "Cliente":
          getClientsData();
          break;
        case "Produto":
          getProductsData();
          break;
        case "Venda":
          getSalesData();
          break;
      }
    } catch (error) {
      alert(`Erro ao excluir ${type.toLowerCase()}`);
      console.log(error);
    }
  }

  if (option === OptionsEnum.CLIENTS) {
    return (
      <div className="card p-0">
        <div className="card-header">Lista de Clientes</div>
        <ul className="list-group list-group-flush">
          {clients.map((client) => {
            return (
              <li className="list-group-item text-start">
                <div className="row">
                  <div className="col">
                    <p>{`${client.nmCliente}`}</p>
                  </div>
                  <div className="col text-end">
                    <button
                      type="button"
                      className="btn btn-primary m-2"
                      onClick={() => {
                        setSelectedCliente(client);
                        setIsEditMode(true);
                      }}
                    >
                      Editar
                    </button>
                    <button
                      type="button"
                      className="btn btn-danger"
                      onClick={() => {
                        const response = window.confirm(
                          `Deseja excluir o cliente ${client.idCliente}?`
                        );

                        if (response) peformDelete(client.idCliente, "Cliente");
                      }}
                    >
                      Excluir
                    </button>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    );
  }

  if (option === OptionsEnum.PRODUCTS) {
    return (
      <div className="card p-0">
        <div className="card-header">Lista de Produtos</div>
        <ul className="list-group list-group-flush">
          {products.map((product) => {
            return (
              <li className="list-group-item text-start">
                <div className="row">
                  <div className="col">
                    <p>{`Produto ${product.idProduto}`}</p>
                  </div>
                  <div className="col text-end">
                    <button
                      type="button"
                      className="btn btn-primary m-2"
                      onClick={() => {
                        setSelectedProduct(product);
                        setIsEditMode(true);
                      }}
                    >
                      Editar
                    </button>
                    <button
                      type="button"
                      className="btn btn-danger"
                      onClick={() => {
                        const response = window.confirm(
                          `Deseja excluir o produto ${product.idProduto}?`
                        );

                        if (response)
                          peformDelete(product.idProduto, "Produto");
                      }}
                    >
                      Excluir
                    </button>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
  if (option === OptionsEnum.SALES) {
    return (
      <div className="card p-0">
        <div className="card-header">Lista de Vendas</div>
        <ul className="list-group list-group-flush">
          {sales.map((sale) => {
            return (
              <li className="list-group-item text-start">
                <div className="row">
                  <div className="col">
                    <p>{`Venda ${sale.idVenda}`}</p>
                  </div>
                  <div className="col text-end">
                    <button
                      type="button"
                      className="btn btn-primary m-2"
                      onClick={() => {
                        setSelectedSale(sale);
                        setIsEditMode(true);
                      }}
                    >
                      Editar
                    </button>
                    <button
                      type="button"
                      className="btn btn-danger"
                      onClick={() => {
                        const response = window.confirm(
                          `Deseja excluir a venda ${sale.idVenda}?`
                        );

                        if (response) peformDelete(sale.idVenda, "Venda");
                      }}
                    >
                      Excluir
                    </button>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}
