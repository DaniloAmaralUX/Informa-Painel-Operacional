// assets
import {
  BarChartOutlined,
  CalendarOutlined,
  FileSearchOutlined,
  FolderOpenOutlined,
  SettingOutlined,
  ToolOutlined
} from '@ant-design/icons';

// icons
const icons = {
  FolderOpenOutlined,
  CalendarOutlined,
  SettingOutlined,
  BarChartOutlined,
  FileSearchOutlined,
  ToolOutlined
};

// ==============================|| MENU ITEMS - MODULES ||============================== //

const modules = {
  id: 'group-modules',
  title: '',
  type: 'group',
  children: [
    {
      id: 'administracao-dados',
      title: 'Administra\u00e7\u00e3o de Dados',
      type: 'collapse',
      url: '/dashboard/default',
      icon: icons.FolderOpenOutlined,
      children: [
        {
          id: 'ativos-admin',
          title: 'Ativos',
          type: 'collapse',
          children: [
            {
              id: 'especialidades',
              title: 'Especialidades',
              type: 'item',
              url: '/dashboard/default',
              breadcrumbs: false
            },
            {
              id: 'categorias',
              title: 'Categorias',
              type: 'item'
            },
            {
              id: 'caracteristicas',
              title: 'Caracter\u00edsticas',
              type: 'item'
            },
            {
              id: 'dominio-caracteristica',
              title: 'Dom\u00ednio Caracter\u00edstica',
              type: 'item'
            },
            {
              id: 'relacao-lista-caracteristicas',
              title: 'Rela\u00e7\u00e3o Lista Caracter\u00edsticas',
              type: 'item'
            },
            {
              id: 'tipo-receita',
              title: 'Tipo de Receita',
              type: 'item'
            },
            {
              id: 'especies',
              title: 'Esp\u00e9cies',
              type: 'item'
            },
            {
              id: 'familias',
              title: 'Fam\u00edlias',
              type: 'item'
            },
            {
              id: 'formularios',
              title: 'Formul\u00e1rios',
              type: 'item'
            },
            {
              id: 'tipo-formulario',
              title: 'Tipo de Formul\u00e1rio',
              type: 'item'
            }
          ]
        }
      ]
    },
    {
      id: 'eventos',
      title: 'Eventos',
      type: 'collapse',
      icon: icons.CalendarOutlined,
      children: [
        {
          id: 'pre-operacao',
          title: 'Pré Operação',
          type: 'collapse',
          children: []
        },
        {
          id: 'tempo-real',
          title: 'Tempo Real',
          type: 'collapse',
          children: []
        },
        {
          id: 'caption-pos-operacao',
          title: 'CAPTION.Pós Operação',
          type: 'collapse',
          children: []
        }
      ]
    },
    {
      id: 'gestao',
      title: 'Gest\u00e3o',
      type: 'collapse',
      icon: icons.SettingOutlined,
      children: [
        {
          id: 'gestao-ativos',
          title: 'Ativos',
          type: 'collapse',
          children: []
        },
        {
          id: 'gestao-atividades',
          title: 'Atividades',
          type: 'collapse',
          children: []
        }
      ]
    },
    {
      id: 'indicadores',
      title: 'Indicadores / Parcela Vari\u00e1vel',
      type: 'collapse',
      icon: icons.BarChartOutlined,
      children: [
        {
          id: 'parametrizacao',
          title: 'Parametriza\u00e7\u00e3o',
          type: 'collapse',
          children: []
        },
        {
          id: 'execucao',
          title: 'Execu\u00e7\u00e3o',
          type: 'collapse',
          children: []
        },
        {
          id: 'consultas-indicadores',
          title: 'Consultas',
          type: 'collapse',
          children: []
        },
        {
          id: 'relatorios-indicadores',
          title: 'Relat\u00f3rios',
          type: 'collapse',
          children: []
        }
      ]
    },
    {
      id: 'consultas-relatorios',
      title: 'Consultas e Relat\u00f3rios',
      type: 'collapse',
      icon: icons.FileSearchOutlined,
      children: [
        {
          id: 'dicionario',
          title: 'Dicion\u00e1rio',
          type: 'collapse',
          children: [
            {
              id: 'mensagens',
              title: 'Mensagens',
              type: 'item'
            },
            {
              id: 'tabelas-campos',
              title: 'Tabelas/Campos',
              type: 'item'
            }
          ]
        }
      ]
    },
    {
      id: 'operacoes',
      title: 'Opera\u00e7\u00f5es',
      type: 'collapse',
      icon: icons.ToolOutlined,
      children: [
        {
          id: 'leitura-operacional',
          title: 'Leitura Operacional',
          type: 'collapse',
          children: [
            {
              id: 'registrar-leituras',
              title: 'Registrar Leituras Op.',
              type: 'item'
            },
            {
              id: 'configurar-grupos-pontos',
              title: 'Configurar Grupos / Pontos por Instala\u00e7\u00e3o',
              type: 'item'
            },
            {
              id: 'configurar-listas',
              title: 'Configurar Listas',
              type: 'item'
            }
          ]
        }
      ]
    }
  ]
};

export default modules;
