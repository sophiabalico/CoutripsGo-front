# 🌍 CoutripsGo - Frontend

> **Descubra o mundo através de uma experiência única de viagem**

**CoutripsGo** é uma aplicação web moderna e intuitiva desenvolvida para apaixonados por viagens que desejam explorar destinos incríveis ao redor do mundo.

## 🚀 Funcionalidades

- ✨ **Interface Moderna**: Design limpo e responsivo
- 🌐 **Exploração de Países**: Navegue por diversos destinos
- 🔍 **Busca Inteligente**: Encontre países com busca por nome e continente
- 📱 **Responsivo**: Funciona perfeitamente em desktop e mobile
- 🎠 **Carrossel Interativo**: Navegação fluida entre destinos populares
- ❤️ **Sistema de Favoritos**: Salve e gerencie países favoritos
- 📍 **Detalhes Completos**: Informações detalhadas sobre cada destino

## 🛠️ Tecnologias

- **Next.js 15** - Framework React
- **React 19** - Biblioteca de UI
- **CSS Modules** - Estilização com escopo
- **Swiper.js** - Carrossel interativo
- **Axios** - Cliente HTTP

## 📋 Pré-requisitos

Antes de começar, certifique-se de ter instalado em sua máquina:

### Para o Frontend (CoutripsGo-front)
- **Node.js** (versão 18.0 ou superior) - [Download](https://nodejs.org/)
- **npm** (vem com Node.js)
- **Git** - [Download](https://git-scm.com/)

### Para o Backend (CoutripsGo)
- **Node.js** (versão 18.0 ou superior)
- **npm** (incluído com Node.js)
- **Banco de dados** (MySQL, PostgreSQL, etc. - verificar no repositório do backend)
- **Git** para controle de versão

### Verificar Instalações
```bash
# Verificar versão do Node.js
node --version

# Verificar versão do npm
npm --version

# Verificar versão do Git
git --version
```

## 🚀 Instalação e Configuração

### 1. Clone os Repositórios

#### Frontend (Este Repositório)
```bash
# Clone o frontend
git clone https://github.com/sophiabalico/CoutripsGo-front.git

# Entre no diretório do frontend
cd CoutripsGo-front
```

#### Backend (Necessário para funcionalidade completa)
```bash
# Clone o backend em um diretório separado
git clone https://github.com/sophiabalico/CoutripsGo.git

# Entre no diretório do backend
cd CoutripsGo
```

### 2. Configuração do Backend

```bash
# No diretório do backend
cd CoutripsGo

# Instale as dependências do backend
npm install

# Configure as variáveis de ambiente do backend
cp .env.example .env
# Edite o arquivo .env com suas configurações

# Rode o comando
npx prisma migrate dev

# Inicie o servidor do backend (porta 5000)
npm run dev
```

O backend estará rodando em: **http://localhost:5000**

### 3. Configuração do Frontend

```bash
# Volte para o diretório do frontend
cd ../CoutripsGo-front

# Instale as dependências do frontend
npm install
```

### 4. Inicie o Servidor de Desenvolvimento do Frontend

```bash
# No diretório do frontend
npm run dev
```

O frontend estará rodando em: **http://localhost:3000**

### 📋 Resumo dos Serviços

| Serviço | URL | Porta | Status |
|---------|-----|-------|--------|
| **Backend** | http://localhost:5000 | 5000 | ⚠️ Iniciar PRIMEIRO |
| **Frontend** | http://localhost:3000 | 3000 | ✅ Iniciar após backend |

### ⚠️ Importante

- **Execute PRIMEIRO o backend** antes do frontend
- **Mantenha ambos os serviços rodando** para funcionalidade completa
- O frontend faz requisições para o backend na porta 5000

## 📁 Estrutura do Projeto

```
CoutripsGo-front/
├── src/app/
│   ├── components/               # Componentes reutilizáveis
│   │   ├── CarrosselPaises/      # Carrossel interativo de países
│   │   ├── DestinosPopulares/    # Seção de destinos populares
│   │   ├── Header/               # Navegação principal
│   │   ├── HeroSection/          # Seção hero da página inicial
│   │   ├── SearchFilters/        # Filtros de busca
│   │   ├── ContactForm/          # Formulário de contato
│   │   ├── FavoriteCard/         # Card de país favorito
│   │   └── hooks/                # Custom hooks reutilizáveis
│   ├── paises/                   # Páginas de países
│   │   ├── page.jsx              # Lista de países
│   │   └── [id]/page.jsx         # Detalhes dinâmicos do país
│   ├── contato/page.jsx          # Página de contato
│   ├── favoritos/page.jsx        # Página de favoritos
│   ├── sobre/page.jsx            # Página sobre a desenvolvedora
│   └── page.jsx                  # Página inicial
├── public/image/                 # Imagens dos países
├── package.json                  # Dependências e scripts
└── next.config.mjs               # Configuração Next.js
```
## 🌐 Páginas e Funcionalidades

| Rota | Descrição | Recursos |
|------|-----------|----------|
| `/` | **Página Inicial** | Hero section e destinos populares |
| `/paises` | **Lista de Países** | Busca por nome, filtro por continente, ordenação |
| `/paises/[id]` | **Detalhes do País** | Informações completas, atrações turísticas, curiosidades |
| `/contato` | **Contato** | Formulário para feedback e sugestões |
| `/sobre` | **Sobre** | Informações sobre a desenvolvedora e redes sociais |
| `/favoritos` | **Favoritos** | Gerenciamento de países salvos como favoritos |

## �👥 Autora

- **Sophia Balico** - [@sophiabalico](https://github.com/sophiabalico)

---

**⭐ Se este projeto te ajudou, considere dar uma estrela no repositório!**
