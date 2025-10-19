{
  description = "Web Starter 2025";

  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-unstable";
    flake-utils.url = "github:numtide/flake-utils";
  };

  outputs = { self, nixpkgs, flake-utils }:
    flake-utils.lib.eachDefaultSystem (system:
      let
        pkgs = nixpkgs.legacyPackages.${system};
      in
      {
        devShells.default = pkgs.mkShell {
          buildInputs = with pkgs; [
            # Node.js and npm
            nodejs_22
            nodePackages.npm
            nodePackages.typescript
            nodePackages.ts-node
            pnpm

            # PostgreSQL client
            postgresql

            # Docker tools
            docker
            docker-compose

            # Development tools
            git
            gnumake

            # Optional: Add more tools as needed
            # pgadmin4
          ];

          shellHook = with pkgs; ''
            echo "🚀 Welcome to the development environment!"
            echo "Available commands:"
            echo ""
            echo "Setup:"
            echo "  pnpm install         - Install all dependencies"
            echo "  docker-compose up -d  - Start PostgreSQL database"
            echo ""
            echo "Development:"
            echo "  pnpm run dev         - Start both frontend and backend servers"
            echo "  pnpm -F frontend dev - Start frontend development server"
            echo "  pnpm -F backend dev  - Start backend development server"
            echo ""
            echo "Database:"
            echo "  pnpm -F backend db:migrate  - Run database migrations"
            echo "  pnpm -F backend db:seed     - Seed the database"
            echo ""
            echo "Build:"
            echo "  pnpm run build       - Build all packages"
            echo "  pnpm -F frontend build"
            echo "  pnpm -F backend build"
          '';

          # Environment variables
          POSTGRES_HOST = "localhost";
          POSTGRES_PORT = "5432";
          POSTGRES_USER = "postgres";
          POSTGRES_PASSWORD = "postgres";
          POSTGRES_DB = "my-app";
          DATABASE_URL = "postgresql://postgres:postgres@localhost:5432/my-app";
        };
      }
    );
}
