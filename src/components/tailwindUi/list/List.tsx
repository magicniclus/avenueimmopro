"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getDataById, getDataByRoute } from "@/firebase/database";
import { setDrawerOpen } from "@/redux/drawerSlice";
import { ArrowRightIcon, PlusIcon } from "@heroicons/react/20/solid";
import {
  ColumnDef,
  FilterFn,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { ChevronDown, MoreHorizontal } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Drawer from "../drawers/Drawer";
import DrawerEstimationContent from "../drawers/DrawerEstimationContent";

// Définir le type de vos données
type Lead = {
  type: string;
  status: string;
  email: string;
  date: string;
  adresse: string;
  annee: string;
  ascenseur: boolean;
  atypical: number;
  balcon: boolean;
  box: boolean;
  chambres: number;
  confidenceIndex: number;
  confidenceMax: number;
  confidenceMin: number;
  contrat: string;
  coordinates: [number, number];
  createdAt: string;
  dpe: string;
  etages: string;
  fai: number;
  faiRate: number;
  firstName: string;
  garage: boolean;
  ges: string;
  id: string;
  jardin: boolean;
  lastName: string;
  nego: number;
  negoRate: number;
  niveaux: string;
  oriantation: string[];
  parking: boolean;
  phone: string;
  pieces: number;
  piscine: boolean;
  predictedPrice: number;
  priceM2: number;
  priceMax: number;
  priceMin: number;
  standing: string;
  surface: number;
  terrasse: boolean;
  travaux: boolean;
  vente: string;
  virtualPrice: number;
  virtualPriceAdjustment: number;
  virtualPriceMax: number;
  virtualPriceMin: number;
  vue: string;
};

// Fonction de filtre personnalisée pour correspondre à tous les champs
const globalFilterFn: FilterFn<Lead> = (row, columnId, value) => {
  const term = value.toLowerCase();
  return (
    row.original.firstName.toLowerCase().includes(term) ||
    row.original.lastName.toLowerCase().includes(term) ||
    row.original.type.toLowerCase().includes(term) ||
    row.original.status.toLowerCase().includes(term) ||
    row.original.email.toLowerCase().includes(term) ||
    row.original.date.toLowerCase().includes(term)
  );
};

export function DataTableDemo(
  { withButton, getData }: { withButton?: boolean; getData?: string } = {
    withButton: true,
  }
) {
  const columns: ColumnDef<Lead>[] = [
    {
      accessorFn: (row) => `${row.firstName} ${row.lastName}`,
      id: "name",
      header: "Nom",
    },
    {
      accessorKey: "type",
      header: "Type de bien",
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => (
        <span
          className={`inline-flex items-center rounded-md bg-gray-50 text-gray-700 ring-gray-600/20`}
        >
          {row.original.status ? row.original.status : "A appeler"}
        </span>
      ),
    },
    {
      accessorKey: "date",
      header: "Date de la demande",
    },
    {
      accessorKey: "email",
      header: "Email",
    },
    {
      accessorFn: (row) => `${Math.round(row.predictedPrice)}€`,
      id: "predictedPrice",
      header: "Prix prédit",
    },
    {
      accessorFn: (row) => `${Math.round(row.surface)}m²`,
      id: "surface",
      header: "Surface",
    },
    {
      id: "actions",
      cell: ({ row }) => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => openDrawerEstimation(row.original.id)}
            >
              Voir
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
    },
  ];

  const [sorting, setSorting] = useState<SortingState>([]);
  const [globalFilter, setGlobalFilter] = useState("");
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});
  const [data, setData] = useState<Lead[]>([]);
  const [getEstimationId, setEstimationId] = useState<string>("");
  const [getEstimation, setEstimation] = useState<Lead | null>(null);
  const [openDrawer, setOpenDrawer] = useState(false);

  const dispatch = useDispatch();
  const searchParams = useSearchParams();
  let userId = searchParams.get("id");

  const setOpen = (value: boolean) => {
    dispatch(setDrawerOpen(value));
  };

  const openDrawerEstimation = async (id: string) => {
    setEstimationId(id);
    const estimationData = await getDataById(`/agents/${userId}/leads`, id);
    if (estimationData) {
      setEstimation(estimationData);
      setOpenDrawer(true);
    } else {
      console.error(
        `No data available at route: /agents/${userId}/leads/${id}`
      );
    }
  };

  useEffect(() => {
    console.log("userId", userId);
    getDataByRoute(`/agents/${userId}/leads`).then((data) => {
      const formattedData = data
        ? Object.keys(data).map((key) => ({
            ...data[key],
            id: key,
          }))
        : [];
      setData(formattedData);
    });
  }, [userId]);

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      globalFilter,
      columnVisibility,
      rowSelection,
    },
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    globalFilterFn,
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
  });

  const handleCloseDrawer = () => {
    setOpenDrawer(false);
  };

  return (
    <div className="w-full relative">
      <Drawer openDrawer={openDrawer} onClose={handleCloseDrawer}>
        <DrawerEstimationContent estimation={getEstimation} />
      </Drawer>
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-base font-semibold leading-6 text-gray-900">
            Leads
          </h1>
          <p className="mt-2 text-sm text-gray-700">
            La liste des demandes d&apos;estimation les plus récentes
          </p>
        </div>
        <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
          <Button
            onClick={() => setOpen(true)}
            className="flex rounded-md bg-blue-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
          >
            <PlusIcon className="h-5 w-5 inline-block -mt-0.5 mr-1" />
            Créer un lead vendeur
          </Button>
        </div>
      </div>
      <div className="mt-8 flex items-center py-4">
        <Input
          placeholder="Filter email, nom, etc..."
          value={globalFilter}
          onChange={(event) => setGlobalFilter(event.target.value)}
          className="max-w-sm"
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              Columns <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                );
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
      {withButton && (
        <div className="mt-8 sm:flex-none">
          <a
            href="/espace-pro/leads"
            className="flex items-center w-max bg-gray-900 rounded-md text-white px-3 py-2 text-center text-sm font-semibold hover:shadow-sm transition duration-150 ease-in-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600"
          >
            Voir tous vos leads
            <ArrowRightIcon className="h-5 w-5 inline-block -mt-0.5 ml-1" />
          </a>
        </div>
      )}
    </div>
  );
}

export default DataTableDemo;
