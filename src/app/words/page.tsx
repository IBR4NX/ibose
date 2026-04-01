"use client";

import React, { useState, useEffect } from "react";
import { Plus, Trash2, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import DropMenu from "./dropMenu"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectScrollDownButton,
  SelectScrollUpButton,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
interface Vocabulary {
  id: string;
  en: string;
  ar: string;
}

export default function DictionaryPage() {
  const [list, setList] = useState<Vocabulary[]>([]);
  const [en, setEn] = useState("");
  const [ar, setAr] = useState("");
  const [loading, setLoading] = useState(false);

  // 1. جلب البيانات عند تحميل الصفحة
  useEffect(() => {
    fetch("/api/words")
      .then((res) => res.json())
      .then((data) => setList(data));
  }, []);

  // 2. دالة الحفظ النهائي في الملف
  const saveToFile = async (updatedList: Vocabulary[]) => {
    setLoading(true);
    await fetch("/api/words", {
      method: "POST",
      body: JSON.stringify(updatedList),
    });
    setLoading(false);
  };

  const handleAdd = async () => {
    if (!en || !ar) return;

    const newList = [{ id: crypto.randomUUID(), en, ar }, ...list];
    setList(newList);
    await saveToFile(newList); // حفظ تلقائي

    setEn("");
    setAr("");
  };
  const handleDelete = async (id: string) => {
    const newList = list.filter((item) => item.id !== id);
    setList(newList);
    await saveToFile(newList); // حفظ تلقائي
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      <Card>
        <CardHeader>
          <CardTitle hidden className="flex justify-between items-center">
            Dictionary Manager
            {loading && <span className="text-xs text-muted-foreground animate-pulse">Saving...</span>}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
            <div className="space-y-2">
              <Label>Word</Label>
              <Input value={en} onChange={(e) => setEn(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label>Translation</Label>
              <Input value={ar} onChange={(e) => setAr(e.target.value)} />
            </div>
            <Button onClick={handleAdd} disabled={loading}>
              <Plus className="mr-2 h-4 w-4" /> Add & Save
            </Button>
            <Select>
              
                <SelectContent>
              <SelectScrollDownButton>vgg</SelectScrollDownButton>
                    <SelectItem>
                        jsjs
                    
                    </SelectItem>
                
                </SelectContent>
            
            </Select>
          </div>
        </CardContent>
      </Card>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>عربي</TableHead>
              <TableHead dir="ltr">English</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {list.map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.ar}</TableCell>
                <TableCell className="font-medium text-xl" dir="ltr" >{item.en}</TableCell>
                <TableCell className="text-right w-10">
                  <Button variant="destructive" size="icon" onClick={() => handleDelete(item.id)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                  <DropMenu item={item} ></DropMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
