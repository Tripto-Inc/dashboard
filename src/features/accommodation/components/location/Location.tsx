'use client';

import { FieldWithError } from '@/components/shared/FieldWithError';
import { Input } from '@/components/ui/input';
import { InputGroup, InputGroupAddon, InputGroupInput } from '@/components/ui/input-group';
import { convertCountryCodeToFlag } from '@/utils/convertCountryCodeToFlag';
import { IconMapPinFilled } from '@tabler/icons-react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { FC, useEffect, useMemo } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { Controller, useFormContext } from 'react-hook-form';
import { MapContainer, Marker, TileLayer, useMap, useMapEvents } from 'react-leaflet';
import { LocationProps } from '../../types/location';

export const Location: FC<LocationProps> = (props) => {
  const { value, onChange } = props;

  const {
    control,
    formState: { errors },
  } = useFormContext();
  const customMarkerIcon = useMemo(() => {
    return L.divIcon({
      className: 'custom-tabler-marker',
      html: renderToStaticMarkup(
        <div className="flex items-center justify-center">
          <IconMapPinFilled size={36} className="text-primary drop-shadow-md" />
        </div>,
      ),
      iconSize: [36, 36],
      iconAnchor: [18, 36],
      popupAnchor: [0, -36],
    });
  }, []);

  const LocationMarker = () => {
    useMapEvents({
      click(e) {
        onChange({ latitude: e.latlng.lat, longitude: e.latlng.lng });
      },
    });

    return value.latitude != null && value.longitude != null ? (
      <Marker position={[value.latitude, value.longitude]} icon={customMarkerIcon} />
    ) : null;
  };

  const RecenterMap = ({ lat, lng }: { lat?: number; lng?: number }) => {
    const map = useMap();

    useEffect(() => {
      if (lat != null && lng != null) {
        map.setView([lat, lng], 15, {
          animate: true,
        });
      }
    }, [lat, lng, map]);

    return null;
  };

  return (
    <div className="grid grid-cols-1 gap-x-6 md:grid-cols-3">
      <div className="z-1 mb-6 h-100 overflow-hidden rounded-lg border border-slate-200 md:col-span-3">
        <MapContainer
          style={{ height: '100%', width: '100%' }}
          center={[value.latitude ?? 52.52, value.longitude ?? 13.4049]}
          zoom={value.latitude != null && value.longitude != null ? 8 : 10}
        >
          <TileLayer
            url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          {value.latitude && value.longitude && (
            <RecenterMap lat={value.latitude} lng={value.longitude} />
          )}
          <LocationMarker />
        </MapContainer>
      </div>

      <FieldWithError
        required
        label="Country"
        htmlFor="country"
        error={errors.country?.message as string}
      >
        <Controller
          name="country"
          control={control}
          render={({ field }) => (
            <Input
              id="country"
              {...field}
              placeholder="Enter a country"
              aria-invalid={!!errors.country?.message}
            />
          )}
        />
      </FieldWithError>

      <FieldWithError
        required
        label="Country Code"
        htmlFor="countryCode"
        error={errors.countryCode?.message as string}
      >
        <Controller
          name="countryCode"
          control={control}
          render={({ field }) => (
            <InputGroup className="bg-white">
              <InputGroupInput
                id="countryCode"
                {...field}
                placeholder="Enter a country code"
                aria-invalid={!!errors.countryCode?.message}
              />
              <InputGroupAddon align="inline-end">
                {field.value.length === 2 && convertCountryCodeToFlag(field.value)}
              </InputGroupAddon>
            </InputGroup>
          )}
        />
      </FieldWithError>

      <FieldWithError required htmlFor="city" label="City" error={errors.city?.message as string}>
        <Controller
          name="city"
          control={control}
          render={({ field }) => (
            <Input
              id="city"
              {...field}
              placeholder="Enter a city"
              aria-invalid={!!errors.city?.message}
            />
          )}
        />
      </FieldWithError>

      <FieldWithError
        required
        label="Address Details"
        htmlFor="addressDetails"
        error={errors.addressDetails?.message as string}
      >
        <Controller
          name="addressDetails"
          control={control}
          render={({ field }) => (
            <Input
              id="addressDetails"
              {...field}
              placeholder="Enter address details"
              aria-invalid={!!errors.addressDetails?.message}
            />
          )}
        />
      </FieldWithError>

      <FieldWithError
        required
        label="Latitude"
        htmlFor="latitude"
        error={errors.latitude?.message as string}
      >
        <Controller
          name="latitude"
          control={control}
          render={({ field }) => (
            <Input
              id="latitude"
              type="number"
              placeholder="Enter a latitude"
              value={field.value ?? ''}
              onChange={(e) =>
                field.onChange(e.target.value === '' ? undefined : Number(e.target.value))
              }
              aria-invalid={!!errors.latitude?.message}
            />
          )}
        />
      </FieldWithError>

      <FieldWithError
        required
        label="Longitude"
        htmlFor="longitude"
        error={errors.longitude?.message as string}
      >
        <Controller
          name="longitude"
          control={control}
          render={({ field }) => (
            <Input
              id="longitude"
              type="number"
              placeholder="Enter a longitude"
              value={field.value ?? ''}
              onChange={(e) =>
                field.onChange(e.target.value === '' ? undefined : Number(e.target.value))
              }
              aria-invalid={!!errors.longitude?.message}
            />
          )}
        />
      </FieldWithError>
    </div>
  );
};
