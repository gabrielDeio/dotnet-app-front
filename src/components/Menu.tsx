import { useState } from "react";
import { server } from "../services/axios";
import { ModeEnum, OptionsEnum } from "./Card";

interface MenuProps {
  setOption: (option: any) => void;
  setIsEditMode: (isEditMode: boolean) => void;
  mode: ModeEnum;
}

export function Menu({ setOption, setIsEditMode, mode }: MenuProps) {
  const [isClients, setIsClients] = useState<string>("active");
  const [isProducts, setIsProducts] = useState<string>("");
  const [isSales, setIsSales] = useState<string>("");
  return (
    <ul className="nav nav-pills flex-column">
      <li className="nav-item">
        <a
          className={`nav-link ${isClients}`}
          aria-current="page"
          onClick={() => {
            setIsSales("");
            setIsProducts("");
            setIsClients("active");
            setOption(OptionsEnum.CLIENTS);
            setIsEditMode(false);
          }}
        >
          {mode === ModeEnum.VIEW ? "Listar Clientes" : "Cadastrar clientes"}
        </a>
      </li>
      <li className="nav-item">
        <a
          className={`nav-link ${isProducts}`}
          onClick={() => {
            setIsClients("");
            setIsSales("");
            setIsProducts("active");
            setOption(OptionsEnum.PRODUCTS);
            setIsEditMode(false);
          }}
        >
          {mode === ModeEnum.VIEW ? "Listar produtos" : "Cadastrar produtos"}
        </a>
      </li>
      <li className="nav-item">
        <a
          className={`nav-link ${isSales}`}
          onClick={() => {
            setIsClients("");
            setIsProducts("");
            setIsSales("active");
            setOption(OptionsEnum.SALES);
            setIsEditMode(false);
          }}
        >
          {mode === ModeEnum.VIEW ? "Listar vendas" : "Cadastrar vendas"}
        </a>
      </li>
    </ul>
  );
}
