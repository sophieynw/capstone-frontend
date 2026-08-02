import { Text, View } from 'react-native';
import { Heading } from '@/components/ui/heading';
import { Input, InputField } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { styles } from '@/styles/styles';
import { Property } from '@/types/entityTypes';

export type EditableProperty = {
  name: string;
  street: string;
  unit: string;
  city: string;
  province: string;
  postalCode: string;
  country: string;
  accessInstructions: string;
};

export function createEditableProperty(property?: Property): EditableProperty {
  return {
    name: property?.name ?? '',
    street: property?.street ?? '',
    unit: property?.unit ?? '',
    city: property?.city ?? '',
    province: property?.province ?? '',
    postalCode: property?.postalCode ?? '',
    country: property?.country ?? '',
    accessInstructions: property?.accessInstructions ?? '',
  };
}

type PropertyInputProps = {
  label: string;
  value: string;
  onChangeText: (value: string) => void;
  multiline?: boolean;
};

function PropertyInput({
  label,
  value,
  onChangeText,
  multiline = false,
}: PropertyInputProps) {
  return (
    <View className='gap-1'>
      <Text>{label}</Text>
      <Input
        className={multiline ? 'h-24 items-start rounded-2xl' : 'rounded-full'}
      >
        <InputField
          value={value}
          onChangeText={onChangeText}
          placeholder={label}
          multiline={multiline}
          textAlignVertical={multiline ? 'top' : 'center'}
        />
      </Input>
    </View>
  );
}

type PropertyEditingSectionProps = {
  property: EditableProperty;
  onPropertyChange: (property: EditableProperty) => void;
};

export function PropertyEditingSection({
  property,
  onPropertyChange,
}: PropertyEditingSectionProps) {
  function updatePropertyField(field: keyof EditableProperty, value: string) {
    onPropertyChange({
      ...property,
      [field]: value,
    });
  }

  return (
    <Card style={styles.mediumCard}>
      <View className='gap-3'>
        <Heading size='md'>Property</Heading>
        <PropertyInput
          label='Name'
          value={property.name}
          onChangeText={(value) => updatePropertyField('name', value)}
        />
        <PropertyInput
          label='Street number and name'
          value={property.street}
          onChangeText={(value) => updatePropertyField('street', value)}
        />
        <PropertyInput
          label='Unit'
          value={property.unit}
          onChangeText={(value) => updatePropertyField('unit', value)}
        />
        <PropertyInput
          label='City'
          value={property.city}
          onChangeText={(value) => updatePropertyField('city', value)}
        />
        <PropertyInput
          label='Province'
          value={property.province}
          onChangeText={(value) => updatePropertyField('province', value)}
        />
        <PropertyInput
          label='Postal code'
          value={property.postalCode}
          onChangeText={(value) => updatePropertyField('postalCode', value)}
        />
        <PropertyInput
          label='Country'
          value={property.country}
          onChangeText={(value) => updatePropertyField('country', value)}
        />
        <PropertyInput
          label='Access instructions'
          value={property.accessInstructions}
          onChangeText={(value) =>
            updatePropertyField('accessInstructions', value)
          }
          multiline
        />
      </View>
    </Card>
  );
}
