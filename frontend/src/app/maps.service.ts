import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class MapsService {
    async fetchPlaceResults(locationInput: string) {
        // @ts-ignore
        const { Place, AutocompleteSessionToken, AutocompleteSuggestion } =
            (await google.maps.importLibrary('places')) as google.maps.PlacesLibrary;

        // Add an initial request body.
        let request = {
            input: locationInput,
        };

        // Create a session token.
        const token = new AutocompleteSessionToken();
        // Add the token to the request.
        // @ts-ignore
        request.sessionToken = token;
        // Fetch autocomplete suggestions.
        const { suggestions } = await AutocompleteSuggestion.fetchAutocompleteSuggestions(request);
        console.log(suggestions);
    }

    async fetchEstimatedTravel(origin: string, destination: string, depart: Date) {
        // initialize services
        const {DistanceMatrixService} = await google.maps.importLibrary("routes") as google.maps.RoutesLibrary;
        const service = new DistanceMatrixService();

        const request = {
            origins: [{placeId: origin}],
            destinations: [{placeId: destination}],
            travelMode: google.maps.TravelMode.DRIVING,
            unitSystem: google.maps.UnitSystem.METRIC,
            avoidHighways: false,
            avoidTolls: false,
            transitOptions: {departureTime: depart},
        };

        const  suggestions  = await service.getDistanceMatrix(request);
        console.log(suggestions);


    }
}
