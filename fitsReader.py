import matplotlib.pyplot as plt
from astropy.utils.data import get_pkg_data_filename
from astropy.io import fits
from astropy.visualization import astropy_mpl_style

#plt.style.use(astropy_mpl_style)
#image_file = get_pkg_data_filename('data/wfs.fits')

#fits.info(image_file)

fn = 'data/wfs.fits'
with fits.open(fn) as hdul:
    img = hdul[0].data
    hdr = hdul[0].header

print(hdr, img)

plt.imshow(img)
plt.show()