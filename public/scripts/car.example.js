class Car {
    static list = [];

    static init(cars) {
        this.list = cars.map((i) => new this(i));
    }

    constructor({ id, plate, manufacture, model, image, rentPerDay, capacity, description, transmission, available, type, year, options, specs, availableAt }) {
        this.id = id;
        this.plate = plate;
        this.manufacture = manufacture;
        this.model = model;
        this.image = image;
        this.rentPerDay = rentPerDay;
        this.capacity = capacity;
        this.description = description;
        this.transmission = transmission;
        this.available = available;
        this.type = type;
        this.year = year;
        this.options = options;
        this.specs = specs;
        this.availableAt = availableAt;
    }

    render() {
        return `
        <div class="card">
        <img class="card-img-top" img src="${this.image}" alt="${this.manufacture}"/>
        <div class="card-body search-result">
            <div class="top">
            <p class="body-regular-14">${this.model}</p>
            <p class="title-bold-16">Rp${this.rentPerDay}/Hari</p>
            <p class="body-light-14">${this.description}</p>
            </div>
            <p><img src="icons/fi_users.png" height="20px" />${this.capacity} Orang</p>
            <p><img src="icons/fi_settings.png" height="20px" />${this.transmission}</p>
            <p><img src="icons/fi_calendar.png" height="20px" />Tahun ${this.year}</p>
        </div>
        <button href="#" class="btn btn-success body-bold-14">Pilih Mobil</button>
        </div>
    `;
    }
}
