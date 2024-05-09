import createRouter from "../../src/router/router";

describe("createRouter", () => {
  let router;
  let mockCallback;
  let mockNotFoundCallback;

  beforeEach(() => {
    router = createRouter();
    mockCallback = jest.fn();
    mockNotFoundCallback = jest.fn();
    router.addRoute("/article/:id", mockCallback);
    router.setNotFound(mockNotFoundCallback);

    global.window = Object.create(window);
    Object.defineProperty(window, "location", {
      value: {
        pathname: '/',
      },
      writable: true,
    });
  });

  test("calls the callback when the route matches", () => {
    window.location.pathname = "/article/react-native-2024";
    router.start();

    expect(mockCallback).toHaveBeenCalled();
  });

  test("calls notFound when no route matches", () => {
    window.location.pathname = "/not-added-page";
    router.start();

    expect(mockNotFoundCallback).toHaveBeenCalled();
  });
});
