import React, { useState } from 'react';


const ECommerceApp = () => {

  const [currentPage, setCurrentPage] = useState('home');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showSuccessScreen, setShowSuccessScreen] = useState(false);
  const [products] = useState([
    { 
      id: 1, 
      name: 'Laptop Pro', 
      price: 999.99, 
      description: 'Laptop de última generación con procesador i7',
      image: 'https://www.animetowncreations.com/cdn/shop/products/ATWMBP0068_3.jpg?v=1625760319&width=1946',
      specs: ['16GB RAM', '512GB SSD', '15.6" Display']
    },
    { 
      id: 2, 
      name: 'Smartphone Plus', 
      price: 699.99, 
      description: 'Smartphone 5G con cámara profesional',
      image: 'https://tsukiyashop.com/cdn/shop/files/FullSizeRender_be31e788-cc24-4655-93ca-a2aa8306b716.jpg?v=1721643246&width=1445',
      specs: ['8GB RAM', '256GB Storage', '6.7" OLED']
    },
    { 
      id: 3, 
      name: 'Auriculares Pro', 
      price: 149.99, 
      description: 'Auriculares inalámbricos con cancelación de ruido',
      image: 'https://m.media-amazon.com/images/I/61BpJ-+2UGL._AC_UF1000,1000_QL80_.jpg',
      specs: ['30h Battery', 'Active Noise Cancelling', 'Bluetooth 5.0']
    },
  ]);

  // Estado para el carrito
  const [cart, setCart] = useState([]);
  const [promoCode, setPromoCode] = useState('');
  const [appliedPromo, setAppliedPromo] = useState(null);

  // Funciones del carrito
  const addToCart = (product) => {
    const existingItem = cart.find(item => item.id === product.id);
    if (existingItem) {
      setCart(cart.map(item =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  const removeFromCart = (productId) => {
    setCart(cart.filter(item => item.id !== productId));
  };


  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity < 1) return;
    setCart(cart.map(item =>
      item.id === productId
        ? { ...item, quantity: newQuantity }
        : item
    ));
  };

  // Calcular total
  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const discount = appliedPromo ? subtotal * 0.1 : 0;
  const total = subtotal - discount;

  // Aplicar código promocional
  const applyPromoCode = () => {
    if (promoCode.toLowerCase() === 'discount10') {
      setAppliedPromo({ code: promoCode, discount: 0.1 });
    } else {
      alert('Código promocional inválido');
    }
  };

  // Componente Modal
  const Modal = ({ children, isOpen, onClose }) => {
    if (!isOpen) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg p-6 max-w-2xl w-full relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
          >
            ×
          </button>
          {children}
        </div>
      </div>
    );
  };
  // Páginas
  const HomePage = () => (
    <div className="space-y-6">
      <div className="relative h-96 rounded-lg overflow-hidden">
        <img
          src="https://http2.mlstatic.com/D_NQ_NP_953679-MLM54275897898_032023-O.webp"
          alt="Banner"
          className="w-full h-full object-cover brightness-50"
        />
        <div className="absolute inset-0 bg-black bg-opacity-70 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4 text-yellow-500">Bienvenidos a Kaneki Tech</h1>
            <button 
              onClick={() => setCurrentPage('catalog')}
              className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition-colors"
            >
              Ver Productos
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {['Envío Gratis', 'Garantía', 'Soporte 24/7'].map((feature, index) => (
          <div key={index} className="bg-black p-6 rounded-lg shadow-lg border border-yellow-500/20">
            <h3 className="text-lg font-semibold mb-2 text-yellow-500">{feature}</h3>
            <p className="text-gray-300">Descripción de la característica</p>
          </div>
        ))}
      </div>
    </div>
  );

  const CatalogPage = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map(product => (
        <div key={product.id} className="bg-black rounded-lg shadow-lg overflow-hidden border border-yellow-500/20">
          <img 
            src={product.image} 
            alt={product.name}
            className="w-full h-48 object-cover"
          />
          <div className="p-4">
            <h3 className="text-lg font-semibold mb-2 text-yellow-500">{product.name}</h3>
            <p className="text-gray-300 mb-2">{product.description}</p>
            <p className="text-xl font-bold mb-4 text-white">${product.price}</p>
            <div className="flex space-x-2">
              <button 
                onClick={() => {
                  setSelectedProduct(product);
                  setShowModal(true);
                }}
                className="px-4 py-2 border border-yellow-500 text-yellow-500 rounded-lg hover:bg-yellow-500 hover:text-black transition-colors"
              >
                Ver Detalles
              </button>
              <button 
                onClick={() => addToCart(product)}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                Agregar al Carrito
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  const AboutPage = () => (
    <div className="bg-black rounded-lg shadow-lg p-6 border border-yellow-500/20">
      <h2 className="text-2xl font-bold mb-4 text-yellow-500">Sobre Nosotros</h2>
      <div className="prose max-w-none text-gray-300">
        <p className="mb-4">
          Somos una empresa dedicada a ofrecer los mejores productos tecnológicos
          a nuestros clientes. Con más de 10 años de experiencia en el mercado,
          nos hemos consolidado como líderes en el sector.
        </p>
        <h3 className="text-xl font-semibold mb-2 text-yellow-500">Nuestra Misión</h3>
        <p className="mb-4">
          Proporcionar tecnología de última generación a precios accesibles,
          garantizando la mejor experiencia de compra para nuestros clientes.
        </p>
        <h3 className="text-xl font-semibold mb-2 text-yellow-500">Nuestra Visión</h3>
        <p className="mb-4">
          Ser la tienda de tecnología más reconocida por nuestra calidad y
          servicio al cliente.
        </p>
      </div>
    </div>
  );

  const CartPage = () => (
    <div className="bg-black rounded-lg shadow-lg p-6 border border-yellow-500/20">
      <h2 className="text-2xl font-bold mb-6 text-yellow-500">
        Carrito de Compras
      </h2>
      
      {cart.length === 0 ? (
        <p className="text-center text-gray-400 py-4">Tu carrito está vacío</p>
      ) : (
        <>
          {cart.map(item => (
            <div key={item.id} className="flex items-center justify-between py-4 border-b border-gray-700">
              <div className="flex items-center gap-4">
                <img 
                  src={item.image} 
                  alt={item.name}
                  className="w-20 h-20 object-cover rounded"
                />
                <div>
                  <h3 className="font-semibold text-yellow-500">{item.name}</h3>
                  <p className="text-gray-300">${item.price}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    className="px-2 py-1 border border-yellow-500 text-yellow-500 rounded hover:bg-yellow-500 hover:text-black transition-colors"
                  >
                    -
                  </button>
                  <span className="w-8 text-center text-white">{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="px-2 py-1 border border-yellow-500 text-yellow-500 rounded hover:bg-yellow-500 hover:text-black transition-colors"
                  >
                    +
                  </button>
                </div>
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
                >
                  Eliminar
                </button>
              </div>
            </div>
          ))}
          
          <div className="mt-6 space-y-4">
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Código promocional"
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value)}
                className="flex-1 px-4 py-2 bg-gray-900 border border-gray-700 rounded text-white placeholder-gray-400"
              />
              <button 
                onClick={applyPromoCode}
                className="px-4 py-2 bg-yellow-500 text-black rounded hover:bg-yellow-600 transition-colors"
              >
                Aplicar
              </button>
            </div>
            
            {appliedPromo && (
              <div className="bg-green-900 border border-green-500 rounded p-4 text-green-300">
                Código promocional aplicado: {appliedPromo.code}
              </div>
            )}
            
            <div className="space-y-2 text-white">
              <div className="flex justify-between">
                <span>Subtotal:</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              {appliedPromo && (
                <div className="flex justify-between text-green-400">
                  <span>Descuento:</span>
                  <span>-${discount.toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between text-xl font-bold text-yellow-500">
                <span>Total:</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>
            
            <button 
              className="w-full py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              onClick={() => {
                setShowSuccessScreen(true);
                setTimeout(() => {
                setCart([]);
                setShowSuccessScreen(false);
                setCurrentPage('home');
                }, 3000);
              }}
              >
            Proceder al Pago
          </button>
          </div>
        </>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col">
      {/* Navbar */}
<nav className="bg-black shadow-lg border-b border-yellow-500/20">
  <div className="container mx-auto px-4">
    <div className="flex items-center justify-between h-16">
      {/* Logo y Título */}
      <div className="flex items-center space-x-8">
        {/* Título de la tienda */}
        <h1 className="text-2xl font-bold text-3d-gold" data-text="Kaneki Tech">
          Kaneki Tech
        </h1>
        {/* Menú de navegación */}
        <div className="flex items-center gap-6">
          <button
            onClick={() => setCurrentPage('home')}
            className={`px-3 py-2 rounded-md text-yellow-500 hover:bg-yellow-500/10 transition-colors ${
              currentPage === 'home' ? 'bg-yellow-500/10' : ''
            }`}
          >
            Inicio
          </button>
          <button
            onClick={() => setCurrentPage('catalog')}
            className={`px-3 py-2 rounded-md text-yellow-500 hover:bg-yellow-500/10 transition-colors ${
              currentPage === 'catalog' ? 'bg-yellow-500/10' : ''
            }`}
          >
            Catálogo
          </button>
          <button
            onClick={() => setCurrentPage('about')}
            className={`px-3 py-2 rounded-md text-yellow-500 hover:bg-yellow-500/10 transition-colors ${
              currentPage === 'about' ? 'bg-yellow-500/10' : ''
            }`}
          >
            Sobre Nosotros
          </button>
        </div>
      </div>
      {/* Carrito */}
      <button 
        onClick={() => setCurrentPage('cart')}
        className="relative p-2 text-yellow-500 hover:bg-yellow-500/10 rounded-full transition-colors"
      >
        🛒
        {cart.length > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-600 text-white rounded-full w-5 h-5 text-xs flex items-center justify-center">
            {cart.reduce((sum, item) => sum + item.quantity, 0)}
          </span>
        )}
      </button>
    </div>
  </div>
</nav>

      {/* Contenido principal */}
      <main className="container mx-auto px-4 py-8">
        {currentPage === 'home' && <HomePage />}
        {currentPage === 'catalog' && <CatalogPage />}
        {currentPage === 'about' && <AboutPage />}
        {currentPage === 'cart' && <CartPage />}
      </main>

      {/* Modal de producto */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-4">
          <div className="bg-black rounded-lg p-6 max-w-2xl w-full relative border border-yellow-500/20">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 text-yellow-500 hover:text-yellow-600"
            >
              ×
            </button>
            {selectedProduct && (
              <div className="space-y-4">
                <h2 className="text-2xl font-bold text-yellow-500">{selectedProduct.name}</h2>
                <img
                  src={selectedProduct.image}
                  alt={selectedProduct.name}
                  className="w-full h-64 object-cover rounded-lg"
                />
                <div>
                  <h3 className="font-semibold mb-2 text-yellow-500">Descripción</h3>
                  <p className="text-gray-300">{selectedProduct.description}</p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2 text-yellow-500">Especificaciones</h3>
                  <ul className="list-disc pl-5 text-gray-300">
                    {selectedProduct.specs.map((spec, index) => (
                      <li key={index}>{spec}</li>
                    ))}
                  </ul>
                </div>
                <div className="flex justify-between items-center">
                  <p className="text-2xl font-bold text-white">${selectedProduct.price}</p>
                  <button 
                    onClick={() => {
                      addToCart(selectedProduct);
                      setShowModal(false);
                    }}
                    className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                  >
                    Agregar al Carrito
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Pantalla de Éxito */}
{showSuccessScreen && (
  <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center p-4 z-50">
    <div className="bg-black rounded-lg p-8 max-w-md w-full border border-yellow-500/20 text-center">
      <div className="mb-6">
        <svg 
          className="w-24 h-24 mx-auto text-green-500"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
          <polyline points="22 4 12 14.01 9 11.01"/>
        </svg>
      </div>
      <h2 className="text-3xl font-bold text-yellow-500 mb-4">
        ¡Compra Exitosa!
      </h2>
      <p className="text-gray-300 mb-6">
        Gracias por tu compra. Recibirás un correo con los detalles de tu pedido.
      </p>
      <div className="text-sm text-gray-400">
        Redirigiendo a la página principal...
      </div>
    </div>
  </div>
)}
{/* Footer */}
<footer className="bg-black border-t border-yellow-500/20 mt-auto">
  <div className="container mx-auto px-4 py-8">
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {/* Columna 1 - Información de la empresa */}
      <div>
        <h3 className="text-yellow-500 font-semibold text-lg mb-4">Kaneki Tech</h3>
        <p className="text-gray-400 mb-4">
          Tu destino número uno para productos tecnológicos de alta calidad.
        </p>
        <div className="flex space-x-4">
          {/* Iconos de redes sociales */}
          <a href="#" className="text-yellow-500 hover:text-yellow-400">
            <span className="text-2xl">📱</span>
          </a>
          <a href="#" className="text-yellow-500 hover:text-yellow-400">
            <span className="text-2xl">💻</span>
          </a>
          <a href="#" className="text-yellow-500 hover:text-yellow-400">
            <span className="text-2xl">📨</span>
          </a>
        </div>
      </div>

      {/* Columna 2 - Enlaces rápidos */}
      <div>
        <h3 className="text-yellow-500 font-semibold text-lg mb-4">Enlaces Rápidos</h3>
        <ul className="space-y-2">
          <li>
            <button 
              onClick={() => setCurrentPage('home')}
              className="text-gray-400 hover:text-yellow-500"
            >
              Inicio
            </button>
          </li>
          <li>
            <button 
              onClick={() => setCurrentPage('catalog')}
              className="text-gray-400 hover:text-yellow-500"
            >
              Catálogo
            </button>
          </li>
          <li>
            <button 
              onClick={() => setCurrentPage('about')}
              className="text-gray-400 hover:text-yellow-500"
            >
              Sobre Nosotros
            </button>
          </li>
          <li>
            <button 
              onClick={() => setCurrentPage('cart')}
              className="text-gray-400 hover:text-yellow-500"
            >
              Carrito
            </button>
          </li>
        </ul>
      </div>

      {/* Columna 3 - Contacto */}
      <div>
        <h3 className="text-yellow-500 font-semibold text-lg mb-4">Contacto</h3>
        <div className="space-y-2">
          <p className="text-gray-400">📍 Dirección: Calle Principal #123</p>
          <p className="text-gray-400">📞 Teléfono: (123) 456-7890</p>
          <p className="text-gray-400">✉️ Email: info@techstore.com</p>
        </div>
      </div>
    </div>

    {/* Copyright */}
    <div className="border-t border-yellow-500/20 mt-8 pt-8 text-center text-gray-400">
      <p>© {new Date().getFullYear()} Kaneki Tech. Todos los derechos reservados.</p>
    </div>
  </div>
</footer>
    </div>
  );
};

export default ECommerceApp;