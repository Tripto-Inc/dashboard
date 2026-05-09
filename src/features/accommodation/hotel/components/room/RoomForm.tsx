import { ButtonPrimary } from '@/components/shared/ButtonPrimary';
import { DocumentUploader } from '@/components/shared/DocumentUploader';
import { FieldWithError } from '@/components/shared/FieldWithError';
import { InfiniteDropdown } from '@/components/shared/InfiniteDropdown';
import { Input } from '@/components/ui/input';
import { InputGroup, InputGroupAddon, InputGroupInput } from '@/components/ui/input-group';
import { Amenity } from '@/features/accommodation/components/amenity/Amenity';
import { useGetCurrenciesDropdown } from '@/features/currency/hooks/useGetCurrenciesDropdown';
import { ImagesPreviewWrapper } from '@/features/document/components/ImagesPreviewWrapper';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  IconBath,
  IconBed,
  IconBedFlat,
  IconImageInPicture,
  IconInfoCircle,
  IconMoneybag,
  IconNumbers,
  IconRuler,
  IconTag,
  IconUsers,
} from '@tabler/icons-react';
import { FC, useEffect } from 'react';
import { Controller, useFieldArray, useForm } from 'react-hook-form';
import { roomSchema, RoomSchema } from '../../schema/room';
import { RoomFormProps } from '../../types/room';

export const RoomForm: FC<RoomFormProps> = (props) => {
  const { accommodationId, currentItem, closeHandler, createHnadler, updateHnadler } = props;
  const {
    reset,
    control,
    getValues,
    formState: { errors, isValid },
  } = useForm<RoomSchema>({
    mode: 'onChange',
    resolver: zodResolver(roomSchema),
    defaultValues: {
      title: '',
      area: undefined,
      count: undefined,
      price: undefined,
      currencyId: '',
      discount: undefined,
      capacity: undefined,
      bedrooms: undefined,
      bathrooms: undefined,
      amenities: [],
      galleryImages: [],
      beds: undefined,
    },
  });

  const galleryImagesPrefix = `${accommodationId}/rooms/${currentItem.room?.id}/gallery`;

  const {
    fields: amenityFields,
    append: appendAmenity,
    remove: removeAmenity,
    update: updateAmenity,
  } = useFieldArray({
    control: control,
    name: 'amenities',
  });

  const onReset = () =>
    reset({
      title: '',
      area: undefined,
      count: undefined,
      price: undefined,
      currencyId: '',
      discount: undefined,
      capacity: undefined,
      bedrooms: undefined,
      bathrooms: undefined,
      amenities: [],
      galleryImages: [],
      beds: undefined,
    });

  const onClose = () => {
    onReset();
    closeHandler();
  };

  const onModify = () => {
    if (isValid) {
      const values = getValues();
      onClose();
      currentItem.index !== undefined
        ? updateHnadler(currentItem.index, values)
        : createHnadler(values);
    }
  };

  useEffect(() => {
    currentItem.room && reset(currentItem.room);
  }, [currentItem.room]);

  return (
    <div className="animate-in fade-in slide-in-from-top-2 relative flex flex-col gap-5 gap-x-4 rounded-2xl border border-slate-200/60 bg-slate-50/50 p-5 shadow-inner duration-200">
      <div className="grid grid-cols-1 gap-x-4 sm:grid-cols-3">
        <div className="mb-5 flex items-center gap-2 sm:col-span-3">
          <IconInfoCircle className="text-blue-600" size={20} />
          <h2 className="font-bold text-slate-800">General Information</h2>
        </div>
        <FieldWithError required label="Room Title" htmlFor="title" error={errors.title?.message}>
          <Controller
            name="title"
            control={control}
            render={({ field }) => (
              <InputGroup className="bg-white">
                <InputGroupInput
                  id="title"
                  {...field}
                  placeholder="Enter a title"
                  aria-invalid={!!errors.title?.message}
                />
                <InputGroupAddon>
                  <IconBed className="size-5 text-slate-600" />
                </InputGroupAddon>
              </InputGroup>
            )}
          />
        </FieldWithError>

        <FieldWithError
          required
          label="Room Capacity"
          htmlFor="capacity"
          error={errors.capacity?.message}
        >
          <Controller
            name="capacity"
            control={control}
            render={({ field }) => (
              <InputGroup className="bg-white">
                <InputGroupInput
                  id="capacity"
                  type="number"
                  value={field.value ?? ''}
                  placeholder="Enter a capacity"
                  onChange={(event) => {
                    const value = event.target.value;
                    field.onChange(value === '' ? undefined : Number(value));
                  }}
                  aria-invalid={!!errors.capacity?.message}
                />
                <InputGroupAddon>
                  <IconUsers className="size-5 text-slate-600" />
                </InputGroupAddon>
              </InputGroup>
            )}
          />
        </FieldWithError>

        <FieldWithError required label="Room Area" htmlFor="area" error={errors.area?.message}>
          <Controller
            name="area"
            control={control}
            render={({ field }) => (
              <InputGroup className="bg-white">
                <InputGroupInput
                  id="area"
                  type="number"
                  value={field.value ?? ''}
                  placeholder="Enter an area"
                  onChange={(event) => {
                    const value = event.target.value;
                    field.onChange(value === '' ? undefined : Number(value));
                  }}
                  aria-invalid={!!errors.area?.message}
                />
                <InputGroupAddon>
                  <IconRuler className="size-5 text-slate-600" />
                </InputGroupAddon>
              </InputGroup>
            )}
          />
        </FieldWithError>

        <FieldWithError required label="Room Count" htmlFor="count" error={errors.count?.message}>
          <Controller
            name="count"
            control={control}
            render={({ field }) => (
              <InputGroup className="bg-white">
                <InputGroupInput
                  id="count"
                  type="number"
                  value={field.value ?? ''}
                  placeholder="Enter room count"
                  onChange={(event) => {
                    const value = event.target.value;
                    field.onChange(value === '' ? undefined : Number(value));
                  }}
                  aria-invalid={!!errors.count?.message}
                />
                <InputGroupAddon>
                  <IconNumbers className="size-5 text-slate-600" />
                </InputGroupAddon>
              </InputGroup>
            )}
          />
        </FieldWithError>

        <FieldWithError
          required
          label="Room Bedrooms"
          htmlFor="bedrooms"
          error={errors.bedrooms?.message}
        >
          <Controller
            name="bedrooms"
            control={control}
            render={({ field }) => (
              <InputGroup className="bg-white">
                <InputGroupInput
                  id="bedrooms"
                  type="number"
                  value={field.value ?? ''}
                  placeholder="Enter bedrooms count"
                  onChange={(event) => {
                    const value = event.target.value;
                    field.onChange(value === '' ? undefined : Number(value));
                  }}
                  aria-invalid={!!errors.bedrooms?.message}
                />
                <InputGroupAddon>
                  <IconBedFlat className="size-5 text-slate-600" />
                </InputGroupAddon>
              </InputGroup>
            )}
          />
        </FieldWithError>

        <FieldWithError
          required
          label="Room Bathrooms"
          htmlFor="bathrooms"
          error={errors.bathrooms?.message}
        >
          <Controller
            name="bathrooms"
            control={control}
            render={({ field }) => (
              <InputGroup className="bg-white">
                <InputGroupInput
                  id="bathrooms"
                  type="number"
                  value={field.value ?? ''}
                  placeholder="Enter bathrooms count"
                  onChange={(event) => {
                    const value = event.target.value;
                    field.onChange(value === '' ? undefined : Number(value));
                  }}
                  aria-invalid={!!errors.bathrooms?.message}
                />
                <InputGroupAddon>
                  <IconBath className="size-5 text-slate-600" />
                </InputGroupAddon>
              </InputGroup>
            )}
          />
        </FieldWithError>
      </div>

      <div className="grid grid-cols-1 gap-x-4 sm:grid-cols-3">
        <div className="mb-5 flex items-center gap-2 sm:col-span-3">
          <IconMoneybag className="text-blue-600" size={20} />
          <h2 className="font-bold text-slate-800">Pricing</h2>
        </div>
        <FieldWithError required htmlFor="price" label="Room Price" error={errors.price?.message}>
          <Controller
            name="price"
            control={control}
            render={({ field }) => (
              <Input
                id="price"
                step="0.1"
                type="number"
                className="bg-white"
                value={field.value ?? ''}
                placeholder="Enter a price"
                onChange={(event) => {
                  const value = event.target.value;
                  field.onChange(value === '' ? undefined : Number(value));
                }}
                aria-invalid={!!errors.price?.message}
              />
            )}
          />
        </FieldWithError>

        <FieldWithError
          required
          htmlFor="currency"
          label="Currency"
          error={errors.currencyId?.message}
        >
          <Controller
            name="currencyId"
            control={control}
            render={({ field, fieldState }) => (
              <InfiniteDropdown
                id="currencyId"
                value={field.value}
                className="bg-white"
                onChange={field.onChange}
                placeholder="Select a currency"
                ariaInvalid={!!fieldState.error}
                useDataHook={useGetCurrenciesDropdown}
              />
            )}
          />
        </FieldWithError>

        <FieldWithError htmlFor="discount" label="Discount (%)" error={errors.discount?.message}>
          <Controller
            name="discount"
            control={control}
            render={({ field }) => (
              <Input
                step="0.1"
                id="discount"
                type="number"
                className="bg-white"
                value={field.value ?? ''}
                placeholder="Enter a discount"
                onChange={(event) => {
                  const value = event.target.value;
                  field.onChange(value === '' ? undefined : Number(value));
                }}
                aria-invalid={!!errors.discount?.message}
              />
            )}
          />
        </FieldWithError>
      </div>

      <div className="grid grid-cols-1 gap-x-4 sm:grid-cols-2 xl:grid-cols-4">
        <div className="mb-5 flex items-center gap-2 sm:col-span-2 xl:col-span-4">
          <IconBed className="text-blue-600" size={20} />
          <h2 className="font-bold text-slate-800">Beds</h2>
        </div>
        <FieldWithError label="King Bed" htmlFor="king-bed" error={errors.beds?.king?.message}>
          <Controller
            name="beds.king"
            control={control}
            render={({ field }) => (
              <Input
                id="king-bed"
                type="number"
                className="bg-white"
                value={field.value ?? ''}
                placeholder="Enter bed count"
                onChange={(event) => {
                  const value = event.target.value;
                  field.onChange(value === '' ? undefined : Number(value));
                }}
                aria-invalid={!!errors.beds?.king?.message}
              />
            )}
          />
        </FieldWithError>

        <FieldWithError label="Queen Bed" htmlFor="queen-bed" error={errors.beds?.queen?.message}>
          <Controller
            name="beds.queen"
            control={control}
            render={({ field }) => (
              <Input
                id="queen-bed"
                type="number"
                className="bg-white"
                value={field.value ?? ''}
                placeholder="Enter bed count"
                onChange={(event) => {
                  const value = event.target.value;
                  field.onChange(value === '' ? undefined : Number(value));
                }}
                aria-invalid={!!errors.beds?.queen?.message}
              />
            )}
          />
        </FieldWithError>

        <FieldWithError
          label="Double Bed"
          htmlFor="double-bed"
          error={errors.beds?.double?.message}
        >
          <Controller
            name="beds.double"
            control={control}
            render={({ field }) => (
              <Input
                id="double-bed"
                type="number"
                className="bg-white"
                value={field.value ?? ''}
                placeholder="Enter bed count"
                onChange={(event) => {
                  const value = event.target.value;
                  field.onChange(value === '' ? undefined : Number(value));
                }}
                aria-invalid={!!errors.beds?.double?.message}
              />
            )}
          />
        </FieldWithError>

        <FieldWithError
          label="Single Bed"
          htmlFor="single-bed"
          error={errors.beds?.single?.message}
        >
          <Controller
            name="beds.single"
            control={control}
            render={({ field }) => (
              <Input
                id="single-bed"
                type="number"
                className="bg-white"
                value={field.value ?? ''}
                placeholder="Enter bed count"
                onChange={(event) => {
                  const value = event.target.value;
                  field.onChange(value === '' ? undefined : Number(value));
                }}
                aria-invalid={!!errors.beds?.single?.message}
              />
            )}
          />
        </FieldWithError>
      </div>

      <div>
        <div className="mb-5 flex items-center gap-2 sm:col-span-4">
          <IconImageInPicture className="text-blue-600" size={20} />
          <h2 className="font-bold text-slate-800">Room Gallery</h2>
        </div>

        <FieldWithError htmlFor="galleryImages" error={errors.galleryImages?.message}>
          <Controller
            name="galleryImages"
            control={control}
            render={({ field }) => (
              <DocumentUploader
                multiple
                ref={field.ref}
                value={field.value}
                onChange={field.onChange}
              />
            )}
          />
        </FieldWithError>
        {currentItem?.room?.id && (
          <ImagesPreviewWrapper
            category="roomGallery"
            bucket="accommodations"
            id={currentItem.room.id}
            prefix={galleryImagesPrefix}
            title={currentItem.room.title}
          />
        )}
      </div>

      <div>
        <div className="mb-5 flex items-center gap-2 sm:col-span-4">
          <IconTag className="text-blue-600" size={20} />
          <h2 className="font-bold text-slate-800">Room Amenities</h2>
        </div>

        <Amenity
          fields={amenityFields}
          error={errors.amenities?.message}
          onAppend={(val) => appendAmenity(val)}
          onRemove={(idx) => removeAmenity(idx)}
          onUpdate={(idx, val) => updateAmenity(idx, val)}
        />
      </div>

      <div className="mt-5 flex items-center gap-2">
        <ButtonPrimary type="button" color="red" tone="outline" onClick={onClose}>
          Close
        </ButtonPrimary>
        <ButtonPrimary type="button" color="black" onClick={onModify} disabled={!isValid}>
          {currentItem.index !== undefined ? 'Update' : 'Add'}
        </ButtonPrimary>
      </div>
    </div>
  );
};
