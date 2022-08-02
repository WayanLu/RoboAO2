import matplotlib.pyplot as plt
from astropy.utils.data import get_pkg_data_filename
from astropy.io import fits
from astropy.visualization import astropy_mpl_style
# Script to read a fits file and plot its image

fn = 'data/WFS_sample'
with fits.open(fn) as hdul:
    img = hdul[0].data
    hdr = hdul[0].header

print(hdr, img)

plt.imshow(img)
plt.show()