import { LabProductData, LabProductInput } from '@ducks/lab/product/types';

export const labProductExample: LabProductData = {
  description: 'string',
  enabled: true,
  flavors: {
    flavor1: {
      num_vcpus: 0,
      num_volumes: 0,
      ram_mb: 0,
      volumes_gb: 0,
    },
    flavor2: {
      num_vcpus: 0,
      num_volumes: 0,
      ram_mb: 0,
      volumes_gb: 0,
    },
  },
  id: 1,
  name: 'OpenShift',
  parameters: [
    {
      advanced: false,
      default: '4.8.0',
      description: 'OpenShift version to install.',
      enum: ['4.8.0', '4.8.1', '4.8.2'],
      name: 'Version',
      required: true,
      type: 'string',
      variable: 'version',
      condition: false,
    },
    {
      advanced: false,
      default: 3,
      description: 'Number of worker nodes in your cluster.',
      name: 'Number of workers',
      required: true,
      type: 'integer',
      variable: 'num_workers',
      condition: false,
    },
    {
      advanced: true,
      default: false,
      description:
        'Toggles if bootstrap node will be deleted in post-installation step',
      name: 'Keep bootstrap node',
      type: 'boolean',
      variable: 'keep_boostrap',
      required: false,
      condition: false,
    },
  ],
  tower_template_name_create: 'rhub-openshift-create',
  tower_template_name_delete: 'rhub-openshift-delete',
};

export const labProductInputData: LabProductInput = {
  ...labProductExample,
};

export const errorExample = {
  detail: 'Invalid token',
  status: 401,
  title: 'Unauthorized',
  type: 'about:blank',
};

export const errorState = {
  loading: false,
  error: true,
  errMsg: {
    detail: 'Invalid token',
    status: 401,
    title: 'Unauthorized',
    type: 'about:blank',
  },
};