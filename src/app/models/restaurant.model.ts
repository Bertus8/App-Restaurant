export class Restaurant {

    constructor(
        public uid: string,
        public cover: string,
        public name: string,
        public short_name: string,
        public cuisines: string[],
        public rating: number,
        public delivery_time: number,
        public price: number,
        public description?: string,
        public email?: string,
        public phone?: number,
        public isClose?: boolean,
        public openTime?: string,
        public closeTime?: string,
        public city?: string,
        public address?: string,
        public distance?: number,
        public latitude?: number,
        public longitude?: number,
        public status?: string,
        public totalRating?: number,
          
    ) {

    }
}