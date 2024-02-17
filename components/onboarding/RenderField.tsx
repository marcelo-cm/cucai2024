// ----- COMPONENTS ----- //
import { Label } from '../ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

// ----- HOOKS ----- //
import { Controller } from 'react-hook-form';

export default function renderField(field: any, control: any) {
  switch (field.type) {
    case 'text':
      return (
        <Controller
          control={control}
          name={field.id}
          rules={{ required: field.required }}
          render={({ field: { onChange, onBlur, value, ref } }) => (
            <div className='grid gap-2'>
              <Label htmlFor={field.id}>{field.label}</Label>
              <Input
                type='text'
                id={field.id}
                value={value || ''}
                placeholder={'Your ' + field.label.toLowerCase()}
                onChange={onChange}
                onBlur={onBlur}
                ref={ref}
              />
            </div>
          )}
        />
      );

    case 'textarea':
      return (
        <Controller
          control={control}
          name={field.id}
          rules={{ required: field.required }}
          render={({ field: { onChange, onBlur, value, ref } }) => (
            <div className='grid gap-2'>
              <Label htmlFor={field.id}>{field.label}</Label>
              <Textarea
                id={field.id}
                value={value || ''}
                placeholder={'Your ' + field.label.toLowerCase()}
                onChange={onChange}
                onBlur={onBlur}
                ref={ref}
              />
            </div>
          )}
        />
      );

    case 'select':
      return (
        <Controller
          control={control}
          name={field.id}
          rules={{ required: field.required }}
          render={({ field: { onChange, value } }) => (
            <div className='grid gap-2'>
              <Label htmlFor={field.id}>{field.label}</Label>
              <Select
                value={value}
                onValueChange={onChange}
              >
                <SelectTrigger className='w-[180px]'>
                  <SelectValue placeholder='Select' />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {field.options.map((option: any) => (
                      <SelectItem
                        key={option.value}
                        value={option.value}
                      >
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          )}
        />
      );

    case 'upload':
      return (
        <Controller
          control={control}
          name={field.id}
          rules={{ required: field.required }}
          render={({ field: { onChange, onBlur, ref } }) => (
            <div className='grid gap-2'>
              <Label htmlFor={field.id}>{field.label}</Label>
              <Input
                type='file'
                id={field.id}
                onChange={(e) => {
                  if (e.target.files) {
                    onChange(e.target.files[0]);
                  }
                }}
                onBlur={onBlur}
                ref={ref}
              />
            </div>
          )}
        />
      );
  }
}
