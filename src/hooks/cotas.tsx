import React, {
  createContext,
  useCallback,
  useState,
  useContext,
  useEffect,
} from "react";
import api from "../service/api";

export interface Cota {
  cota: number;
  nome: string;
  telefone: string;
  status: string;
  idVendedor: number;
  dataHora: string;
  dataAtualizacao: string;
}

interface Vendedor {
  id: number;
  nome: string;
}

interface CotasContextData {
  cotas: Cota[];
  vendedores: Vendedor[];
  getFilter(idVendedor: number, status: string): Promise<void>;
  refreshListCotas(): void;
}

const CotasContext = createContext<CotasContextData>({} as CotasContextData);

const CotasProvider: React.FC<any> = ({ children }) => {
  const [cotas, setCotas] = useState<Cota[]>(new Array<Cota>());
  const [vendedores, setVendedores] = useState<Vendedor[]>(new Array<Vendedor>());

  useEffect(() => {
    getVendedores();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const refreshListCotas = useCallback(() => {
    setCotas([]);
  }, []);

  const formataDataHora = (dataHora: string) => {
    return new Date(dataHora).toLocaleString();
  }

  const getVendedores = useCallback(async () => {
    try {
      const response = await api.get<Vendedor[]>(`/cotas/vendedores`);
      setVendedores([{ id: 0, nome: "" }, ...response.data]);
    } catch (error: any) {
      alert(error);
    }
  }, []);

  const getFilter = useCallback(async (idVendedor: number, status: string) => {
    try {
      const response = await api.get<Cota[]>(`/cotas/filtro?idVendedor=${idVendedor}&status=${status}`);
      setCotas(response.data.map(c => ({
        cota: c.cota,
        nome: c.nome,
        telefone: c.telefone,
        status: c.status,
        idVendedor: c.idVendedor,
        dataHora: formataDataHora(c.dataHora),
        dataAtualizacao: formataDataHora(c.dataAtualizacao),
      })));
    } catch (error: any) {
      alert(error);
    }
  }, []);

  return (
    <CotasContext.Provider value={{ cotas: cotas, vendedores: vendedores, getFilter, refreshListCotas }}>
      {children}
    </CotasContext.Provider>
  );
};

function useCota(): CotasContextData {
  const context = useContext(CotasContext);

  if (!context) {
    throw new Error("useCota must be used within an CotasProvider");
  }

  return context;
}

export { CotasProvider, useCota };
