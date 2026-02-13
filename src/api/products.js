import API_BASE from './config';

export async function getProductById(id) {
  try {
    const res = await fetch(`${API_BASE}/api/Products/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    const text = await res.text();
    let data = null;
    try {
      data = text ? JSON.parse(text) : null;
    } catch (e) {
      data = null;
    }

    if (!res.ok) {
      const message = (data && data.message) || res.statusText || 'Failed to fetch product';
      throw new Error(message);
    }

    if (!data) {
      throw new Error('Product not found');
    }

    // Handle images - could be array, string, or null
    let images = [];
    if (data.images) {
      if (Array.isArray(data.images)) {
        images = data.images.filter(img => img && img.trim());
      } else if (typeof data.images === 'string') {
        images = data.images.trim() ? [data.images] : [];
      }
    }

    // Ensure at least one placeholder if no images
    if (images.length === 0) {
      images = ['https://via.placeholder.com/500x400?text=No+Image'];
    }

    // Parse accessories if it's a string
    let accessories = [];
    if (data.accessories) {
      if (Array.isArray(data.accessories)) {
        accessories = data.accessories;
      } else if (typeof data.accessories === 'string') {
        accessories = data.accessories.split(',').map(a => a.trim()).filter(a => a);
      }
    }

    return {
      id: data.id,
      title: data.title,
      category: data.category,
      brand: data.brand,
      model: data.model,
      condition: data.condition,
      price: data.price,
      originalPrice: data.originalPrice,
      listingType: data.listingType || 'sell',
      description: data.description,
      specifications: {
        storage: data.storage,
        ram: data.ram,
        display: data.display,
        processor: data.processor,
        camera: data.camera,
        battery: data.battery,
        os: data.os
      },
      images,
      accessories,
      seller: data.seller || {
        id: 1,
        name: 'Unknown Seller',
        rating: 4.5,
        location: 'Not specified',
        joinedDate: new Date().toISOString()
      },
      postedDate: data.postedDate || new Date().toISOString(),
      views: data.views || 0,
      interested: data.interested || 0,
      status: data.status || 'available',
      exchangePreferences: data.exchangePreferences || []
    };
  } catch (error) {
    console.error('Error fetching product:', error);
    throw error;
  }
}

export async function fetchProducts() {
  try {
    const res = await fetch(`${API_BASE}/api/Products`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    const text = await res.text();
    let data = null;
    try {
      data = text ? JSON.parse(text) : [];
    } catch (e) {
      data = [];
    }

    if (!res.ok) {
      const message = (data && data.message) || res.statusText || 'Failed to fetch products';
      throw new Error(message);
    }

    // Ensure data is an array; map backend field names to frontend expectations
    const productsArray = Array.isArray(data) ? data : data.data || [];
    return productsArray.map(product => {
      // Handle images - could be array, string, or null
      let images = [];
      if (product.images) {
        if (Array.isArray(product.images)) {
          images = product.images.filter(img => img && img.trim()); // filter out empty strings
        } else if (typeof product.images === 'string') {
          images = product.images.trim() ? [product.images] : [];
        }
      }

      // Ensure at least one placeholder if no images
      if (images.length === 0) {
        images = ['https://via.placeholder.com/400x300?text=No+Image'];
      }

      return {
        id: product.id,
        title: product.title,
        category: product.category,
        brand: product.brand,
        model: product.model,
        condition: product.condition,
        price: product.price,
        originalPrice: product.originalPrice,
        listingType: product.listingType || 'sell',
        description: product.description,
        specifications: {
          storage: product.storage,
          ram: product.ram,
          display: product.display,
          processor: product.processor,
          camera: product.camera,
          battery: product.battery,
          os: product.os
        },
        images,
        seller: product.seller || { id: 1, name: 'Unknown Seller', rating: 4.5, location: '', joinedDate: '' },
        postedDate: product.postedDate,
        views: product.views || 0,
        interested: product.interested || 0,
        status: product.status || 'available'
      };
    });
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
}

export async function createProduct(formData, token) {
  // Build FormData object to handle file uploads
  const body = new FormData();
  
  // Add text fields with PascalCase to match backend schema
  body.append('Title', formData.title || '');
  body.append('Category', formData.category || '');
  body.append('Brand', formData.brand || '');
  body.append('Model', formData.model || '');
  body.append('Condition', formData.condition || '');
  body.append('Price', parseFloat(formData.price) || 0);
  body.append('OriginalPrice', parseFloat(formData.originalPrice) || 0);
  body.append('ListingType', formData.listingType || 'sell');
  body.append('Description', formData.description || '');
  body.append('SellerId', parseInt(localStorage.getItem('userId') || '1'));
  
  // Specifications
  body.append('Storage', formData.specifications?.storage || '');
  body.append('Ram', formData.specifications?.ram || '');
  body.append('Display', formData.specifications?.display || '');
  body.append('Processor', formData.specifications?.processor || '');
  body.append('Camera', formData.specifications?.camera || '');
  body.append('Battery', formData.specifications?.battery || '');
  body.append('OS', formData.specifications?.os || '');
  
  // Handle images - convert blob URLs to File objects or append as URLs
  if (formData.images && formData.images.length > 0) {
    for (const image of formData.images) {
      // If it's a blob URL, fetch and convert to File
      if (image.startsWith('blob:')) {
        try {
          const response = await fetch(image);
          const blob = await response.blob();
          body.append('Images', blob, `image_${Date.now()}.jpg`);
        } catch (error) {
          console.warn('Could not convert blob image:', error);
        }
      } else {
        // Otherwise, send as string URL
        body.append('Images', image);
      }
    }
  }
  
  const res = await fetch(`${API_BASE}/api/Products`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`
    },
    body
  });
  
  const text = await res.text();
  let data = null;
  try {
    data = text ? JSON.parse(text) : null;
  } catch (e) {
    data = text;
  }
  
  if (!res.ok) {
    const message = (data && data.message) || res.statusText || 'Failed to create product';
    throw new Error(message);
  }
  
  return data;
}
