class App {
    constructor() {
        this.searchButton = document.getElementById("search-btn");
        this.driverInput = document.getElementById("driver-option");
        this.dateInput = document.getElementById("date-option");
        this.timeInput = document.getElementById("time-option");
        this.passangerInput = document.getElementById("amount-option");
        this.carContainerElement = document.getElementById("cars-container");
    }

    async init() {
        await this.load();

        const validateInputs = () => {
            const driverValue = this.driverInput.value.trim();
            const dateValue = this.dateInput.value.trim();
            const timeValue = this.timeInput.value.trim();

            // Mengecek apakah semua input terisi
            if (driverValue && dateValue && timeValue) {
                this.searchButton.removeAttribute("disabled");
            } else {
                this.searchButton.setAttribute("disabled", true);
            }
        };

        // Panggil validateInputs setiap kali input diubah
        this.driverInput.addEventListener("input", validateInputs);
        this.dateInput.addEventListener("input", validateInputs);
        this.timeInput.addEventListener("input", validateInputs);

        // Panggil validateInputs setelah memuat halaman
        validateInputs();

        // Register click listener
        this.searchButton.onclick = this.filterer;
    }

    filterer = () => {
        const driverValue = this.driverInput.value;
        const dateValue = this.dateInput.value;
        const timeValue = this.timeInput.value;

        // Parsing tanggal dan waktu dari input
        const orderDate = new Date(dateValue + "T" + timeValue + ":00.000Z");

        // Ambil data mobil dari local storage
        const localData = localStorage.getItem("CARS");
        const newData = JSON.parse(localData);

        // Filter mobil yang sesuai dengan input pengguna
        const res = newData.filter((car) => car.tipeDriver === driverValue && new Date(car.availableAt) < orderDate);

        console.log(newData);
        console.log(res);
        // Inisialisasi ulang mobil yang ditampilkan
        this.clear();
        Car.init(res);
        this.run();
    };

    async load() {
        // Memuat data mobil dari API dan inisialisasi
        const cars = await Binar.listCars();
        Car.init(cars);
    }

    run = () => {
        // Menampilkan mobil yang sudah diinisialisasi
        Car.list.forEach((car) => {
            const node = document.createElement("div");
            node.className = "col-md-4";
            node.innerHTML = car.render();
            this.carContainerElement.appendChild(node);
        });
    };

    clear = () => {
        // Menghapus mobil yang ditampilkan sebelumnya
        this.carContainerElement.innerHTML = "";
    };
}
