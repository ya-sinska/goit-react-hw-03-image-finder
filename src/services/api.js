const KEY = '25289922-76fc98c8dd80f80668ef47aa3';
export const fetchImages = (name, page=1, limit=20) => {
    const params = new URLSearchParams({
    per_page: limit,
    page: page,
    // orientation:"horizontal" 
  });
    return  fetch(`https://pixabay.com/api/?key=${KEY}&q=${name}&image_type=photo&${params}`)
    .then(r => {if (r.ok) { return r.json() }
    return Promise.reject(new Error(`Picture ${name} didn't find`))})
}

