// Define a interface InventoryStatus para representar o status de inventário de um produto
interface InventoryStatus {
    label: string; // O rótulo do status (por exemplo, 'INSTOCK', 'LOWSTOCK', 'OUTOFSTOCK')
    value: string; // O valor associado ao status (uma string que representa o estado do inventário)
}

// Define a interface Client para representar os dados de um produto
export interface Client {
    key?: string; // Chave única do produto, opcionalmente presente
    id?: string; // ID do produto, opcionalmente presente
    code?: string; // Código do produto, opcionalmente presente
    name?: string; // Nome do produto, opcionalmente presente
    description?: string; // Descrição do produto, opcionalmente presente
    price?: number; // Preço do produto, opcionalmente presente
    quantity?: number; // Quantidade disponível do produto, opcionalmente presente
    inventoryStatus?: InventoryStatus; // Status de inventário do produto, opcionalmente presente e do tipo InventoryStatus
    category?: string; // Categoria do produto, opcionalmente presente
    image?: string; // URL da imagem do produto, opcionalmente presente
    rating?: number; // Classificação do produto, opcionalmente presente
}
