/// <reference types="@types/google.maps" />
import { Injectable } from '@angular/core';
import { Commute } from './shared/models/commute';
import objectHash from 'object-hash';
import { DateTime } from 'luxon';
import { Place } from './shared/models/place';
import qs from 'qs';

@Injectable({
    providedIn: 'root',
})
export class MapsService {
    generateDirectionsUrl({ placeId, placeName }: Place): string {
        console.log('generating url');

        const paramsObj = {
            destination: placeName,
            destination_place_id: placeId,
        };
        const params = qs.stringify(paramsObj);

        return `https://www.google.com/maps/dir/?api=1&${params}`;
    }

    async fetchPlaceResults(locationInput: string): Promise<Place[]> {
        const { AutocompleteSessionToken, AutocompleteSuggestion } =
            (await google.maps.importLibrary('places')) as google.maps.PlacesLibrary;

        const request: google.maps.places.AutocompleteRequest = {
            input: locationInput,
            sessionToken: new AutocompleteSessionToken(),
        };

        let suggestions = undefined;
        try {
            suggestions = (await AutocompleteSuggestion.fetchAutocompleteSuggestions(request))
                .suggestions;
        } catch (error) {
            console.error(error);
        }
        if (suggestions === undefined) return [];

        const places: Place[] = [];
        for (const suggestion of suggestions) {
            const placePrediction = suggestion.placePrediction;
            if (placePrediction === null) continue;

            const placeId = placePrediction.placeId;
            const placeName = placePrediction.text.toString();
            places.push({ placeId, placeName });
        }

        return places;
    }

    travelTimeCache = new Map<string, google.maps.Duration>();
    async getEstimatedTravelTime(commute: Commute): Promise<google.maps.Duration | null> {
        const commuteHash = objectHash(commute);
        const cachedTime = this.travelTimeCache.get(commuteHash);
        if (cachedTime !== undefined) {
            console.log('retrieve from cahce!');
            return cachedTime;
        }

        const time = await this.fetchEstimatedTravelTime(
            commute.originId,
            commute.destinationId,
            DateTime.fromSeconds(commute.originDepartureTime).toJSDate(),
        );
        if (time === null) return time;

        this.travelTimeCache.set(commuteHash, time);
        return time;
    }

    private async fetchEstimatedTravelTime(
        origin: string,
        destination: string,
        depart: Date,
    ): Promise<google.maps.Duration | null> {
        const { DistanceMatrixService } = (await google.maps.importLibrary(
            'routes',
        )) as google.maps.RoutesLibrary;
        const service = new DistanceMatrixService();

        const request: google.maps.DistanceMatrixRequest = {
            origins: [{ placeId: origin }],
            destinations: [{ placeId: destination }],
            travelMode: google.maps.TravelMode.DRIVING,
            unitSystem: google.maps.UnitSystem.METRIC,
            avoidHighways: false,
            avoidTolls: false,
            transitOptions: { departureTime: depart },
        };

        const response = await service.getDistanceMatrix(request);
        if (response === undefined) return null;

        const commute = response.rows.at(0)?.elements.at(0);
        if (commute === undefined || commute.duration === undefined) {
            return null;
        }

        return commute.duration;
    }
}
