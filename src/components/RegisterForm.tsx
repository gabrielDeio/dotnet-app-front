import { useState } from "react";
import { Cliente, ModeEnum, OptionsEnum } from "./Card";
import { useForm } from "react-hook-form";
import { Product, Sales } from "./List";
import { server } from "../services/axios";

interface RegisterFormProps {
  option: OptionsEnum;
}

export function RegisterForm({ option }: RegisterFormProps) {
  const onSubmit = async (data: any) => {
    switch (option) {
      case OptionsEnum.CLIENTS:
        try {
          const response = await server.post("/api/Cliente", data);
          if (response.status === 200) {
            alert("sucesso!");
          }
        } catch (error) {
          alert("Error cadastrando cliente!");
          console.log(error);
        }
        break;
      case OptionsEnum.PRODUCTS:
        try {
          const response = await server.post("/api/Produto", data);
          if (response.status === 200) alert("Sucesso!");
        } catch (error) {
          alert("Erro cadastrando produto!");
          console.log(error);
        }
        break;
      case OptionsEnum.SALES:
        try {
          const response = await server.post("/api/Venda", data);
          if (response.status === 200) alert("sucesso");
        } catch (error) {
          alert("Erro cadastrando venda!");
          console.log(error);
        }
        break;
    }

    console.log(data);
  };

  if (option === OptionsEnum.CLIENTS) {
    const { register, handleSubmit, getValues } = useForm({
      defaultValues: {
        idCliente: "",
        nmCliente: "",
        cidade: "",
      },
    });
    return (
      <form
        className="text-start"
        onSubmit={(e) => {
          onSubmit(getValues());
        }}
      >
        <div className="mb-3">
          <label htmlFor="nome-cliente" className="form-label">
            ID Cliente
          </label>
          <input
            type="number"
            className="form-control"
            {...register("idCliente")}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="nome-cliente" className="form-label">
            Nome
          </label>
          <input
            type="text"
            className="form-control"
            {...register("nmCliente")}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="cidade-cliente" className="form-label">
            Cidade
          </label>
          <input type="text" className="form-control" {...register("cidade")} />
        </div>
        <button className="btn btn-primary m-2" type="submit">
          Salvar
        </button>
      </form>
    );
  }
  if (option === OptionsEnum.PRODUCTS) {
    const { register, handleSubmit, getValues } = useForm({
      defaultValues: {
        idProduto: "",
        dscProduto: "",
        vlrUnitario: "",
      },
    });
    return (
      <form
        className="text-start"
        onSubmit={(e) => {
          onSubmit(getValues());
        }}
      >
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            ID Produto
          </label>
          <input
            type="number"
            className="form-control"
            {...register("idProduto")}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Descrição
          </label>
          <input
            type="text"
            className="form-control"
            {...register("dscProduto")}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInput1" className="form-label">
            Valor unitário
          </label>
          <input
            type="number"
            className="form-control"
            {...register("vlrUnitario")}
          />
        </div>
        <button className="btn btn-primary m-2" type="submit">
          Salvar
        </button>
      </form>
    );
  }

  if (option === OptionsEnum.SALES) {
    const { register, handleSubmit, getValues } = useForm({
      defaultValues: {
        idVenda: "",
        idCliente: "",
        idProduto: "",
        qtdVenda: "",
        vlrUnitarioVenda: "",
        dthVenda: "",
      },
    });
    return (
      <form
        className="text-start"
        onSubmit={(e) => {
          onSubmit(getValues());
        }}
      >
        <div className="mb-3">
          <label className="form-label">ID Venda</label>
          <input
            type="number"
            className="form-control"
            {...register("idVenda")}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">ID cliente</label>
          <input
            type="number"
            className="form-control"
            {...register("idCliente")}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">ID produto</label>
          <input
            type="number"
            className="form-control"
            {...register("idProduto")}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Quantidade de venda</label>
          <input
            type="number"
            className="form-control"
            {...register("qtdVenda")}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Valor unitário da venda</label>
          <input
            type="number"
            className="form-control"
            {...register("vlrUnitarioVenda")}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Data da venda</label>
          <input
            type="date"
            className="form-control"
            {...register("dthVenda")}
          />
        </div>
        <button className="btn btn-primary m-2" type="submit">
          Salvar
        </button>
      </form>
    );
  }
}
