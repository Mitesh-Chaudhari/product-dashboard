import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import ProductGrid from "../components/ProductGrid";

const mockStore = configureStore([]);

jest.mock("../components/ProductCard", () => ({ product }) => (
  <div data-testid="product-card">
    <h3>{product.title}</h3>
    <button
      aria-label={
        product.isFavorite
          ? `Remove ${product.title} from favorites`
          : `Add ${product.title} to favorites`
      }
    >
      {product.isFavorite ? "★" : "☆"}
    </button>
  </div>
));

const mockProducts = [
  { id: 1, title: "Classic T-Shirt", isFavorite: false },
  { id: 2, title: "Stylish Jeans", isFavorite: true },
  { id: 3, title: "Running Shoes", isFavorite: false },
];

const mockFilters = {
  search: "",
  category: "all",
  sort: "name-asc",
};

describe("ProductGrid", () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      products: {
        items: mockProducts,
        filters: mockFilters,
      },
    });

    render(
      <Provider store={store}>
        <ProductGrid />
      </Provider>
    );
  });

  test("renders product grid", () => {
    const grid = screen.getByLabelText("product-grid");
    expect(grid).toBeInTheDocument();
  });

  test("renders correct number of product cards", () => {
    const cards = screen.getAllByTestId("product-card");
    expect(cards).toHaveLength(mockProducts.length);
  });

  test("renders <h3> titles for all products", () => {
    mockProducts.forEach((p) => {
      expect(screen.getByRole("heading", { level: 3, name: p.title })).toBeInTheDocument();
    });
  });

  test("renders favorite buttons with correct aria-label", () => {
    mockProducts.forEach((p) => {
      const btn = screen.getByRole("button", {
        name: p.isFavorite
          ? `Remove ${p.title} from favorites`
          : `Add ${p.title} to favorites`,
      });
      expect(btn).toBeInTheDocument();
    });
  });
});
