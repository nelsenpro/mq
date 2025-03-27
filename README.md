# MyQueryJS (mq.js)

**mq.js** adalah pustaka JavaScript yang dikembangkan oleh **Nelsen Niko**, dirancang untuk mempermudah manipulasi **DOM**, event handling, AJAX, dan animasi dalam pengembangan web.

## Fitur Utama:
- ✅ **Manipulasi DOM** – Memilih, mengubah, menambah, atau menghapus elemen HTML.
- ✅ **Event Handling** – Menangani event seperti klik, hover, dan lainnya.
- ✅ **Animasi** – Efek fade, slide, dan animasi lanjutan.
- ✅ **Manipulasi Atribut & Kelas** – Menambah, menghapus, dan mengganti atribut serta kelas CSS.
- ✅ **Metode Utilitas** – Scrolling, wrapping, cloning, dan lainnya.
- ✅ **Kompatibilitas** – Dapat digunakan di browser modern.

Memulai
-------

### Sertakan Pustaka mq

```
<script src="mq.js"></script>
```
```
<script src="https://cdn.jsdelivr.net/gh/nelsenpro/mq/mq.js"></script>
```

## Contoh Penggunaan:
```js
// Memilih elemen
var myElement = $(".my-element");

// Mengubah konten HTML
myElement.html("<p>Halo, mq!</p>");

// Menangani klik
myElement.click(function() {  
    console.log("Elemen diklik!");  
});

// Menjalankan animasi
myElement.fadeIn(1);

// Toggle kelas CSS
myElement.toggleClass("aktif");
```

## Kesimpulan:
mq.js adalah alternatif ringan untuk pustaka seperti jQuery dengan berbagai metode tambahan. Cocok untuk pengembangan web modern yang membutuhkan manipulasi DOM yang lebih fleksibel dan efisien.

---
