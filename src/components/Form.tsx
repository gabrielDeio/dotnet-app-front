import { useState } from "react";
import { Cliente, ModeEnum, OptionsEnum } from "./Card";
import { useForm } from "react-hook-form";
import { Product, Sales } from "./List";
import { server } from "../services/axios";

interface FormProps {
  client: Cliente;
  product: Product;
  sale: Sales;
  option: OptionsEnum;
  mode: ModeEnum;
}

export function Form({ client, option, product, sale, mode }: FormProps) {
  const [isEditMode, setIsEditMode] = useState<boolean>(false);

  const onSubmit = async (data: any, id: number, type: string) => {
    try {
      const response = await server.patch(`/api/${type}/${id}`, data);
      if (response.status === 200) alert("Atualização realizada com sucesso!");
    } catch (error) {
      alert("Erro durante atualização");
      console.log(error);
    }
  };

  if (option === OptionsEnum.CLIENTS) {
    const { register, handleSubmit, getValues } = useForm({
      defaultValues: {
        nmCliente: client?.nmCliente,
        cidade: client?.cidade,
      },
    });
    return (
      <form
        className="text-start"
        onSubmit={() => onSubmit(getValues(), client?.idCliente, "Cliente")}
      >
        <div className="mb-3">
          <label htmlFor="nome-cliente" className="form-label">
            Nome
          </label>
          <input
            disabled={!isEditMode}
            type="text"
            className="form-control"
            {...register("nmCliente")}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="cidade-cliente" className="form-label">
            Cidade
          </label>
          <input
            disabled={!isEditMode}
            type="text"
            className="form-control"
            {...register("cidade")}
          />
        </div>
        <button
          className="btn btn-primary m-2"
          type="submit"
          disabled={!isEditMode}
        >
          Salvar
        </button>
        <button
          className="btn btn-primary"
          onClick={(e) => {
            e.preventDefault();
            setIsEditMode(!isEditMode);
          }}
        >
          Habilitar Edição
        </button>
      </form>
    );
  }
  if (option === OptionsEnum.PRODUCTS) {
    const { register, handleSubmit, getValues } = useForm({
      defaultValues: {
        dscProduto: product ? product.dscProduto : "",
        vlrUnitario: product ? product.vlrUnitario : "",
      },
    });
    return (
      <form
        className="text-start"
        onSubmit={() => onSubmit(getValues(), product.idProduto, "Produto")}
      >
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Descrição
          </label>
          <input
            disabled={!isEditMode}
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
            disabled={!isEditMode}
            type="number"
            className="form-control"
            {...register("vlrUnitario")}
          />
        </div>
        <button
          className="btn btn-primary m-2"
          type="submit"
          disabled={!isEditMode}
        >
          Salvar
        </button>
        <button
          className="btn btn-primary"
          onClick={(e) => {
            e.preventDefault();
            setIsEditMode(!isEditMode);
          }}
        >
          Habilitar Edição
        </button>
      </form>
    );
  }

  if (option === OptionsEnum.SALES) {
    const { register, handleSubmit, getValues } = useForm({
      defaultValues: {
        idCliente: sale ? sale.idCliente : "",
        idProduto: sale ? sale.idProduto : "",
        qtdVenda: sale ? sale.qtdVenda : "",
        vlrUnitarioVenda: sale ? sale.vlrUnitarioVenda : "",
        dthVenda: sale ? sale.dthVenda : "",
      },
    });
    return (
      <form
        className="text-start"
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit(getValues(), sale.idVenda, "Venda");
        }}
      >
        <div className="mb-3">
          <label className="form-label">ID cliente</label>
          <input
            disabled={!isEditMode}
            type="number"
            className="form-control"
            {...register("idCliente")}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">ID produto</label>
          <input
            disabled={!isEditMode}
            type="number"
            className="form-control"
            {...register("idProduto")}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Quantidade de venda</label>
          <input
            disabled={!isEditMode}
            type="number"
            className="form-control"
            {...register("qtdVenda")}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Valor unitário da venda</label>
          <input
            disabled={!isEditMode}
            type="number"
            className="form-control"
            {...register("vlrUnitarioVenda")}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Data da venda</label>
          <input
            disabled={!isEditMode}
            type="date"
            className="form-control"
            {...register("dthVenda")}
          />
        </div>
        <button
          className="btn btn-primary m-2"
          type="submit"
          disabled={!isEditMode}
        >
          Salvar
        </button>
        <button
          className="btn btn-primary"
          onClick={(e) => {
            e.preventDefault();
            setIsEditMode(!isEditMode);
          }}
        >
          Habilitar Edição
        </button>
      </form>
    );
  }
}
