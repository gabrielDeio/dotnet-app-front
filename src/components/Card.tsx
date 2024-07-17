import { useEffect, useState } from "react";
import { List, Product, Sales } from "./List";
import { Menu } from "./Menu";
import { Form } from "./Form";
import { RegisterForm } from "./RegisterForm";
import { server } from "../services/axios";

export interface Cliente {
  idCliente: number;
  nmCliente: string;
  cidade: string;
}
export enum OptionsEnum {
  "CLIENTS",
  "PRODUCTS",
  "SALES",
}
export enum ModeEnum {
  "REGISTER",
  "VIEW",
}

export function Card() {
  const [option, setOptions] = useState<OptionsEnum>(OptionsEnum.CLIENTS);
  const [selectClient, setSelectedClient] = useState<Cliente>();
  const [selectedProduct, setSelectedProduct] = useState<Product>();
  const [selectedSale, setSelectedSale] = useState<Sales>();
  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  const [mode, setMode] = useState<ModeEnum>(ModeEnum.VIEW);

  async function peformCharge(type: string) {
    try {
      const response = await server.post(`/${type}`);
      if (response.status === 200)
        alert("Carga de dados realizada com sucesso!");
      window.location.reload();
    } catch (error) {
      console.log(error);
      alert("Erro durante carga de dados");
    }
  }

  return (
    <div className="card text-center p-0" id="main-card">
      <div className="card-header">
        <ul className="nav nav-tabs card-header-tabs">
          <li className="nav-item">
            <a
              className="nav-link"
              aria-current="true"
              onClick={() => setMode(ModeEnum.VIEW)}
            >
              Visualização
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" onClick={() => setMode(ModeEnum.REGISTER)}>
              Cadastro
            </a>
          </li>
          <li className="nav-item">
            <a
              className="nav-link"
              onClick={() => {
                const response = confirm(
                  "Deseja realizar uma carga de dados de clientes?"
                );
                if (response) peformCharge("clientes");
              }}
            >
              Carga-Cliente
            </a>
          </li>
          <li className="nav-item">
            <a
              className="nav-link"
              onClick={() => {
                const response = confirm(
                  "Deseja realizar uma carga de dados de produtos?"
                );
                if (response) peformCharge("Produtos");
              }}
            >
              Carga-Produto
            </a>
          </li>
          <li className="nav-item">
            <a
              className="nav-link"
              onClick={() => {
                const response = confirm(
                  "Deseja realizar uma carga de dados de vendas?"
                );
                if (response) peformCharge("Vendas");
              }}
            >
              Carga-Venda
            </a>
          </li>
        </ul>
      </div>
      <div className="card-body p-0">
        <div className="container m-0">
          <div className="row">
            <div className="col-3">
              <Menu
                mode={mode}
                setOption={(option: OptionsEnum) => setOptions(option)}
                setIsEditMode={setIsEditMode}
              />
            </div>
            {mode === ModeEnum.REGISTER ? (
              <div className="col">
                <RegisterForm option={option} />
              </div>
            ) : (
              <div className="col">
                {isEditMode ? (
                  <Form
                    mode={mode}
                    client={selectClient}
                    option={option}
                    product={selectedProduct}
                    sale={selectedSale}
                  />
                ) : (
                  <List
                    option={option}
                    setSelectedCliente={setSelectedClient}
                    setIsEditMode={setIsEditMode}
                    setSelectedProduct={setSelectedProduct}
                    setSelectedSale={setSelectedSale}
                  />
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
